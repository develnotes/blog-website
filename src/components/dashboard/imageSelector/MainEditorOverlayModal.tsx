/* eslint-disable @next/next/no-img-element */
"use client";

import * as cloudinary from "@/cloudinary";
import { useCallback, useEffect, useState } from "react";

import {
    IconLibraryPhoto,
    IconPhotoCheck,
    IconPhotoEdit,
    IconPhotoPlus,
    IconWorld,
    IconX,
} from "@tabler/icons-react";

import * as imageActions from "@/actions/image";
import { Overlay } from "../Overlay";
import { useFormState, useFormStatus } from "react-dom";
import { SelectImageFromURL } from "./SelectImageFromURL";
import { SelectImageFromLibrary } from "./SelectImageFromLibrary";
import { ImageCroppingEditor } from "./ImageCroppingEditor";

/* Image editor (Main/first Modal) */
type MainEditorOverlayModalType = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    image: string,
    setImage: React.Dispatch<React.SetStateAction<string>>,
}

export const MainEditorOverlayModal = ({
    open,
    setOpen,
    image,
    setImage,
}: MainEditorOverlayModalType) => {

    /* Control image editor state */
    const [openImageEditor, setOpenImageEditor] = useState<boolean>(false);

    /* Chose image origin */
    const [showSelector, setShowSelector] = useState<"from-url" | "saved-images" | null>(null);

    /* Saved images */
    const [savedImages, setSavedImages] = useState<cloudinary.ResourceApiResponse>();

    /* Preview image */
    const [imagePreview, setImagePreview] = useState<string>(image || "");

    /* This is the "OK" button */
    const saveAddedImage = useCallback(() => {
        setOpen(false);
        setImage(imagePreview);
        setShowSelector(null);
        setImagePreview("");
    }, [imagePreview, setImage, setOpen]);

    /* This is the "Cancel" button */
    const cancelAddImage = useCallback(() => {
        setOpen(false);
        setShowSelector(null);
        setImagePreview("");
    }, [setImagePreview, setOpen]);

    /* Close Add Image Overlay */
    const closeOverlay = useCallback(() => {
        setOpen(false);
        setShowSelector(null);
        setImagePreview("");
    }, [setOpen]);

    /* Fetch saved images from cloudinary */
    const fetchSavedImages = useCallback(() => {
        cloudinary.fetchResources()
            .then(r => {
                console.log(r.resources);
                setSavedImages(r);
            })
            .catch(err => console.log(err));
    }, []);

    /* Upload image to cloudinary */
    const initialUploadState: imageActions.UploadFormState = { response: undefined };
    const uploadImageAction = imageActions.upload.bind(null, initialUploadState, imagePreview);
    const [uploadState, uploadAction] = useFormState(uploadImageAction, initialUploadState);

    useEffect(() => {
        const response = uploadState.response;
        if (response) {
            console.log(response);
            setImage(response.secure_url);
            setImagePreview(response.secure_url);
            fetchSavedImages();
        }
    }, [uploadState.response, fetchSavedImages, setImage, setImagePreview]);

    return (
        <Overlay open={open}>
            <div className="select-image">
                <button className="icon-button select-image__button-close" onClick={closeOverlay}>
                    <IconX />
                </button>

                <div className="select-image__header">
                    <button
                        className="button select-image__button"
                        onClick={() => {
                            showSelector === "from-url" ?
                                setShowSelector(null) :
                                setShowSelector("from-url")
                        }}>
                        <IconWorld />
                        <div>Add from URL</div>
                    </button>
                    <button
                        className="button select-image__button"
                        onClick={() => {
                            showSelector === "saved-images" ?
                                setShowSelector(null) :
                                setShowSelector("saved-images");

                            { savedImages === undefined && fetchSavedImages() }
                        }}>
                        <IconLibraryPhoto />
                        <div>Add from library</div>
                    </button>
                </div>

                <div className="select-image__main">
                    {
                        showSelector === "from-url" &&
                        <SelectImageFromURL
                            imagePreview={imagePreview}
                            setImagePreview={setImagePreview}
                        />
                    }
                    {
                        showSelector === "saved-images" &&
                        <SelectImageFromLibrary
                            savedImages={savedImages}
                            setImage={setImage}
                            setImagePreview={setImagePreview}
                            setSavedImages={setSavedImages}
                        />
                    }
                </div>

                {
                    (imagePreview) &&
                    <div className="select-image__edit-area">

                        <div className="select-image__edit-area__main">

                            {/* Main preview */}
                            <img
                                className="select-image__edit-area__selected-image-preview"
                                src={imagePreview}
                                alt="selected image"
                            />

                            {/* Tools */}
                            <div className="select-image__edit-area__tools">
                                <button className="button select-image__edit-area__tools__button"
                                    onClick={() => setOpenImageEditor(true)}>
                                    <IconPhotoEdit />
                                    <div>Edit</div>
                                </button>

                                <form action={uploadAction}>
                                    <ButtonUploadImage imagePreview={imagePreview} />
                                </form>
                            </div>
                        </div>

                        {/* Second Modal */}
                        <ImageCroppingEditor
                            open={openImageEditor}
                            imagePreview={imagePreview}
                            setOpen={setOpenImageEditor}
                            setImagePreview={setImagePreview}
                            setSavedImages={setSavedImages}
                        />

                        <div className="select-image__footer">
                            <button onClick={saveAddedImage} className="button select-image__footer__button">
                                Ok
                            </button>
                            <button onClick={cancelAddImage} className="button select-image__footer__button">
                                Cancel
                            </button>
                        </div>
                    </div>
                }
            </div>
        </Overlay>
    );
};

const ButtonUploadImage = ({ imagePreview }: { imagePreview: string }) => {

    const { pending } = useFormStatus();

    /* Check if url is fro cloudinary */
    const isCloudinaryImage = useCallback((urlString: string) => {
        const url = new URL(urlString);
        return url.hostname === "res.cloudinary.com";
    }, []);

    return (
        <button className="button select-image__edit-area__tools__button"
            disabled={isCloudinaryImage(imagePreview)}>
            {
                isCloudinaryImage(imagePreview) ?
                    <>
                        <IconPhotoCheck />
                        <div>Saved</div>
                    </> :
                    <>
                        <IconPhotoPlus />
                        {pending ? <div>Saving...</div> : <div>Save</div>}
                    </>
            }
        </button>
    );
};