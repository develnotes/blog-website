/* eslint-disable @next/next/no-img-element */
"use client";

import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

import * as cloudinary from "@/cloudinary";

import { useCallback, useRef, useState } from "react";

import {
    IconCrop,
    IconPhotoCheck,
    IconPhotoUp,
    IconRestore,
    IconX,
} from "@tabler/icons-react";

import * as imageActions from "@/actions/image";
import { Overlay } from "./Overlay";
import { useFormState, useFormStatus } from "react-dom";

/* Image editor component */
type ImageCroppingEditorType = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    imagePreview: string
    setImagePreview: React.Dispatch<React.SetStateAction<string>>,
    setSavedImages: React.Dispatch<React.SetStateAction<cloudinary.ResourceApiResponse | undefined>>,
}

export const ImageCroppingEditor = ({
    open,
    setOpen,
    imagePreview,
    setImagePreview,
    setSavedImages,
}: ImageCroppingEditorType
) => {
    const width = 1125; /* 750 * 1.5 */
    const height = 450; /* 300 * 1.5 */

    const cropperRef = useRef<Cropper>();
    const previewImageRef = useRef<HTMLImageElement>(null);

    /* Transformed image data */
    const [croppedURLData, setCroppedURLData] = useState<string>();

    /* Remove the Cropper instance */
    const revertImage = useCallback(() => {
        cropperRef.current && cropperRef.current.reset();
        setCroppedURLData(undefined);
    }, []);

    /* Prepare formData with cropped image (Blob) data */
    const imageFormData = () => {
        const formData = new FormData();
        const cropper = cropperRef.current;

        if (cropper) {
            cropper
                .getCroppedCanvas()
                .toBlob(imageBlob => {
                    if (imageBlob) {
                        formData.append("image", imageBlob, "image.jpeg");
                    }
                }, "image/jpeg", 1);
        }

        return formData;
    };

    /* Load Cropper JS on "Crop" button */
    const loadCropper = useCallback(() => {
        const image = previewImageRef.current;

        const cropperCanvasOptions: Cropper.GetCroppedCanvasOptions = {
            maxWidth: width,
            maxHeight: height,
            minWidth: width,
            minHeight: height,
            fillColor: "lightgray",
            imageSmoothingEnabled: true,
            imageSmoothingQuality: "high",
        };

        if (image) {
            const cropper = new Cropper(image, {
                aspectRatio: width / height,
                autoCropArea: 1,

                crop(ev) {
                    cropper
                        .getCroppedCanvas() /* Not using cropperCanvasOptions here...  */
                        .toBlob((blob) => {
                            if (blob) {
                                const image = URL.createObjectURL(blob);
                                setCroppedURLData(image);
                            }
                        }, "image/jpeg", 1);
                },
            });

            cropperRef.current = cropper;
        }
    }, []);

    /* Upload imageFormData (Blob) to cloudinary */
    const initialFormState: imageActions.UploadStreamFormState = { response: undefined };
    const uploadImageStreamAction = imageActions.uploadStream.bind(null, initialFormState, imageFormData());
    const [uploadStreamState, uploadStreamAction] = useFormState(uploadImageStreamAction, initialFormState);
    const ButtonUploadStreamImage = () => {
        const { pending } = useFormStatus();
        return (
            <button className="button select-image__editor__options__button" type="submit">
                <>
                    {
                        pending ?
                            <>
                                <IconPhotoUp />
                                <div style={{ fontSize: 11 }}>Saving...</div>
                            </> :
                            <>
                                <IconPhotoUp />
                                <div>Upload</div>
                            </>
                    }
                </>
            </button>
        );
    };

    /* Fetch saved images from cloudinary */
    const fetchSavedImages = useCallback(() => {
        cloudinary.fetchResources()
            .then(r => {
                console.log(r.resources);
                setSavedImages(r);
            })
            .catch(err => console.log(err));
    }, [setSavedImages]);

    /* Use cropped image */
    const acceptCroppedImage = useCallback(() => {
        if (uploadStreamState.response) {
            const image = uploadStreamState.response.secure_url;
            setImagePreview(image);
            setOpen(false);
            fetchSavedImages();
        }
    }, [uploadStreamState, setImagePreview, setOpen, fetchSavedImages]);

    const close = useCallback(() => {
        setOpen(false);
        cropperRef.current && cropperRef.current.clear();
        setCroppedURLData(undefined);
    }, [setOpen]);

    return (
        <Overlay open={open} zIndex={21000}>
            <div className="select-image__editor">
                <button className="select-image__editor__button-close"
                    onClick={close}>
                    <IconX />
                </button>

                {/* Preview cropping editor and cropping result */}
                <div className="select-image__editor__previews">
                    <div className="select-image__editor__preview">
                        {/* Cropper js loads on top of this */}
                        <img
                            ref={previewImageRef}
                            className="select-image__editor__preview__image"
                            src={imagePreview}
                            alt="selected image"
                        />
                    </div>
                    {
                        croppedURLData &&
                        /* Here we can visialize the cropped image */
                        <div className="select-image__editor__preview__cropped">
                            <img className="select-image__editor__preview__cropped__image"
                                src={croppedURLData}
                                alt=""
                            />
                        </div>
                    }
                </div>

                {/* Options: Crop / Upload */}
                <div className='select-image__editor__options'>
                    <button
                        onClick={loadCropper}
                        className="button select-image__editor__options__button">
                        <IconCrop />
                        <div>Crop</div>
                    </button>
                    <button
                        onClick={revertImage}
                        className="button select-image__editor__options__button">
                        <IconRestore />
                        <div>Revert</div>
                    </button>
                    {
                        uploadStreamState.response ?
                            <button className="button select-image__editor__options__button"
                                onClick={acceptCroppedImage}>
                                <IconPhotoCheck />
                                <div>Ok</div>
                            </button> :
                            <form action={uploadStreamAction}>
                                <ButtonUploadStreamImage />
                            </form>
                    }
                </div>
            </div>
        </Overlay>
    );
};