/* eslint-disable @next/next/no-img-element */
"use client";

import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

import * as cloudinary from "@/cloudinary";
import { useCallback, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconCrop, IconLibrary, IconPhotoEdit, IconPhotoUp, IconTrash, IconWorld, IconX } from "@tabler/icons-react";
import { uploadImage } from "@/actions/uploadImage";
import { Loader } from "./Loader";

export const SelectPostImage = ({
    image,
    setImage
}: {
    image: string,
    setImage: React.Dispatch<React.SetStateAction<string>>
}) => {

    const cropperRef = useRef<Cropper>();
    const previewImageRef = useRef<HTMLImageElement>(null);

    const [showSelector, setShowSelector] = useState<"from-url" | "saved-images" | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [editImage, setEditImage] = useState<boolean>(false);

    const [savedImages, setSavedImages] = useState<cloudinary.ResourceApiResponse>();
    const [imagePreview, setImagePreview] = useState<string>(image || "");
    const [croppedURLData, setCroppedURLData] = useState<any>();
    const [imageBlob, setImageBlob] = useState<Blob>();

    const fetchSavedImages = useCallback(() => {
        cloudinary.fetchImages()
            .then(r => {
                console.log(r.resources);
                setSavedImages(r);
            })
            .catch(err => console.log(err));
    }, []);

    const uploadImageAction = (() => {
        const formData = new FormData();

        if (imageBlob) {
            formData.append("image", imageBlob, "image.jpeg");
        }

        return uploadImage.bind(null, formData);
    })();

    const deleteImageFromLibrary = useCallback((publicId: string) => {
        cloudinary.deleteImage(publicId);
        fetchSavedImages();
    }, []);

    const isCloudinaryImage = useCallback((urlString: string) => {
        const url = new URL(urlString);
        return url.hostname === "res.cloudinary.com";
    }, []);

    const saveImageToCloudinary = useCallback(() => {
        cloudinary.saveImage(imagePreview)
            .then(r => {
                setImage(r.secure_url);
                fetchSavedImages();
            })
            .catch(err => console.log(err));
    }, [imagePreview, setImage, fetchSavedImages]);


    const selectFromSavedImages = useCallback((url: string) => {
        setImage(url);
        setImagePreview(url);
    }, [setImage, setImagePreview]);

    const loadCropper = useCallback(() => {
        const image = previewImageRef.current;

        if (image) {
            const cropper = new Cropper(image, {
                aspectRatio: 750 / 300,
                autoCropArea: 1,

                cropend(ev) {
                    cropper
                        .getCroppedCanvas({
                            maxWidth: 750,
                            maxHeight: 300,
                            minWidth: 750,
                            minHeight: 300,
                        })
                        .toBlob((blob) => {
                            if (blob) {
                                setImageBlob(blob);
                                const image = URL.createObjectURL(blob);
                                setCroppedURLData(image);
                            }
                        }, "image/jpeg");
                },
            });

            cropperRef.current = cropper;
        }
    }, []);

    const acceptCroppedImage = useCallback(() => {
        setImagePreview(croppedURLData);
        setCroppedURLData(undefined);
        cropperRef.current?.destroy();
    }, [croppedURLData]);

    const closeOverlay = useCallback(() => {
        setOpen(false);
        setShowSelector(null);
    }, []);

    const saveAddedImage = useCallback(() => {
        //saveImageToCloudinary();
        
        setOpen(false);
        /* 
        setShowSelector(null);
        setImagePreview("");
        setCroppedURLData(undefined);
        cropperRef.current?.destroy(); 
        */
    }, []);

    const cancelAddImage = useCallback(() => {
        setOpen(false);
        setShowSelector(null);
        setImagePreview("");
        setCroppedURLData(undefined);
        cropperRef.current?.destroy();
    }, []);

    return (
        <div className="select-image-container">
            <button className="select-image-container__button-open" onClick={() => setOpen(true)}>Add Image</button>

            {
                image &&
                <div className="select-image__preview">
                    <img
                        className="select-image__preview__image"
                        src={image}
                        alt="selected image"
                    />
                </div>
            }
            {
                open &&
                <div className="overlay-container">
                    <div className="select-image">
                        <button className="select-image__button-close" onClick={closeOverlay}>
                            <IconX />
                        </button>
                        <div className="select-image__header">
                            <button
                                className="select-image__button"
                                onClick={() => {
                                    showSelector === "from-url" ?
                                        setShowSelector(null) :
                                        setShowSelector("from-url")
                                }}>
                                <IconWorld />
                                <div>Add from URL</div>
                            </button>
                            <button
                                className="select-image__button"
                                onClick={() => {
                                    showSelector === "saved-images" ?
                                        setShowSelector(null) :
                                        setShowSelector("saved-images");

                                    { savedImages === undefined && fetchSavedImages() }
                                }}>
                                <IconLibrary />
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
                                    selectFromSavedImages={selectFromSavedImages}
                                    deleteImageFromLibrary={deleteImageFromLibrary}
                                />
                            }
                        </div>
                        {
                            (imagePreview) &&
                            <div className="select-image__edit-area">

                                <div className="select-image__edit-area__tools">
                                    <button className="select-image__edit-area__tools__button"
                                        onClick={() => setEditImage(true)}>
                                        <IconPhotoEdit />
                                        <div>Edit Image</div>
                                    </button>
                                </div>
                                {/* Main preview */}
                                <img
                                    className="select-image__selected-image-preview"
                                    src={imagePreview}
                                    alt="selected image"
                                />


                                {
                                    editImage &&
                                    <div className="select-image__editor-overlay">
                                        <div className="select-image__editor">
                                            <button className="select-image__editor__button-close"
                                                onClick={() => setEditImage(false)}>
                                                <IconX />
                                            </button>

                                            <div className="select-image__editor__previews">
                                                <div className="select-image__editor__preview">
                                                    <img
                                                        ref={previewImageRef}
                                                        className="select-image__editor__preview__image"
                                                        src={imagePreview}
                                                        alt="selected image"
                                                    />
                                                </div>
                                                {
                                                    croppedURLData &&
                                                    <div className="select-image__editor__preview__cropped">
                                                        <img className="select-image__editor__preview__cropped__image" src={croppedURLData} alt="" />

                                                        <button className="select-image__editor__preview__cropped__button"
                                                            onClick={acceptCroppedImage}>
                                                            Save crop
                                                        </button>
                                                    </div>
                                                }
                                            </div>

                                            <div className='select-image__editor__options'>
                                                <button
                                                    onClick={loadCropper}
                                                    className="select-image__editor__options__button">
                                                    <IconCrop />
                                                    <div>Crop</div>
                                                </button>
                                                <form action={uploadImageAction}>
                                                    <button className="select-image__editor__options__button" type="submit">
                                                        <IconPhotoUp />
                                                        <div>Upload</div>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="select-image__footer">
                                    <button onClick={saveAddedImage} className="select-image__footer__button">
                                        Ok
                                    </button>
                                    <button onClick={cancelAddImage} className="select-image__footer__button">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

type SelectImageFromURLType = {
    imagePreview: string,
    setImagePreview: React.Dispatch<React.SetStateAction<string>>,
}

const SelectImageFromURL = ({
    imagePreview,
    setImagePreview,
}: SelectImageFromURLType) => {
    return (
        <div className="select-image__from-url">
            <label htmlFor="image" className="select-image__from-url__label">URL</label>
            <input
                type="url"
                name="image"
                className="select-image__from-url__input"
                value={imagePreview}
                onChange={e => setImagePreview(e.target.value)}
            />
        </div>
    );
};


type SelectImageFromLibraryType = {
    savedImages: cloudinary.ResourceApiResponse | undefined,
    selectFromSavedImages: (url: string) => void,
    deleteImageFromLibrary: (publicId: string) => void,
}

const SelectImageFromLibrary = ({
    savedImages,
    selectFromSavedImages,
    deleteImageFromLibrary,
}: SelectImageFromLibraryType) => {

    const galleryRef = useRef<HTMLDivElement>(null);

    const scrollGallery = useCallback((direction: "left" | "right") => {
        const gallery = galleryRef.current;

        if (gallery) {
            console.log(gallery, gallery.clientWidth);
            const galleryWidth = gallery.clientWidth;

            if (direction === "left") {
                gallery.scrollBy({ behavior: "smooth", left: -galleryWidth, top: 0 });
            } else {
                gallery.scrollBy({ behavior: "smooth", left: galleryWidth, top: 0 });
            }
        }
    }, []);

    return (
        <div className="select-image__saved">
            <button className="select-image__saved__button select-image__saved__button--prev"
                onClick={() => scrollGallery("left")}>
                <IconChevronLeft />
            </button>
            <div ref={galleryRef} className="select-image__saved__gallery">
                {
                    !savedImages ?
                        <Loader loading={true} /> :
                        <>
                            {
                                savedImages.resources.map(resource => {
                                    return (
                                        <div className="select-image__saved__gallery__item"
                                            key={resource.public_id}>
                                            <div className="select-image__saved__gallery__item__button-background">
                                                <button className="select-image__saved__gallery__item__button"
                                                    onClick={() => deleteImageFromLibrary(resource.public_id)}>
                                                    <IconTrash size={18} />
                                                </button>
                                            </div>

                                            <img onClick={() => selectFromSavedImages(resource.secure_url)}
                                                src={resource.secure_url}
                                                alt="image preview"
                                                height={150}
                                                width="auto"
                                            />
                                        </div>
                                    );
                                })
                            }
                        </>
                }
            </div>
            <button className="select-image__saved__button select-image__saved__button--next"
                onClick={() => scrollGallery("right")}>
                <IconChevronRight />
            </button>
        </div>
    );
}