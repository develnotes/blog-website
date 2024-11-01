/* eslint-disable @next/next/no-img-element */
"use client";

import * as cloudinary from "@/cloudinary";
import { useCallback, useRef } from "react";

import {
    IconChevronLeft,
    IconChevronRight,
    IconTrash,
} from "@tabler/icons-react";

import { Loader } from "@/components/dashboard/Loader";

type SelectImageFromLibraryType = {
    setImage: React.Dispatch<React.SetStateAction<string>>,
    savedImages: cloudinary.ResourceApiResponse | undefined,
    setSavedImages: React.Dispatch<React.SetStateAction<cloudinary.ResourceApiResponse | undefined>>,
    setImagePreview: React.Dispatch<React.SetStateAction<string>>
}

export const SelectImageFromLibrary = ({
    setImage,
    savedImages,
    setSavedImages,
    setImagePreview,
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

    /* Fetch saved images from cloudinary */
    const fetchImagesFromLibrary = useCallback(() => {
        cloudinary.fetchResources()
            .then(r => {
                console.log(r.resources);
                setSavedImages(r);
            })
            .catch(err => console.log(err));
    }, [setSavedImages]);

    /* Remove images from cloudinary */
    const deleteImageFromLibrary = useCallback((publicId: string) => {
        cloudinary.removeResource(publicId);
        fetchImagesFromLibrary();
    }, [fetchImagesFromLibrary]);

    /* Select image from gallery shown */
    const selectFromSavedImages = useCallback((url: string) => {
        setImage(url);
        setImagePreview(url);
    }, [setImage, setImagePreview]);

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