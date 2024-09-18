/* eslint-disable @next/next/no-img-element */
"use client";

import * as cloudinary from "@/cloudinary";
import { useCallback, useState } from "react";

export const SelectPostImage = ({
    image,
    setImage
}: {
    image: string,
    setImage: React.Dispatch<React.SetStateAction<string>>
}) => {

    const [imagePreview, setImagePreview] = useState<string>("");
    const [showSelector, setShowSelector] = useState<"from-url" | "saved-images" | null>(null);
    const [savedImages, setSavedImages] = useState<cloudinary.ResourceApiResponse>();

    const fetchSavedImages = useCallback(() => {
        cloudinary.fetchImages()
            .then(r => {
                console.log(r.resources);
                setSavedImages(r);
            })
            .catch(err => console.log(err));
    }, []);

    const saveImageToCloudinary = useCallback(() => {
        cloudinary.saveImage(imagePreview)
            .then(r => {
                console.log(r);
                setShowSelector(null);
                setImage(r.secure_url);
                fetchSavedImages();
            })
            .catch(err => console.log(err));

    }, [imagePreview, setImage, fetchSavedImages]);

    const selectFromSavedImages = useCallback((url: string) => {
        setShowSelector(null);
        setImage(url);
    }, [setImage]);

    return (
        <div className="select-image">
            <div className="select-image__header">
                <button
                    className="select-image__button"
                    onClick={() => {
                        showSelector === "from-url" ?
                            setShowSelector(null) :
                            setShowSelector("from-url")
                    }}>
                    Add from URL
                </button>
                <button
                    className="select-image__button"
                    onClick={() => {
                        showSelector === "saved-images" ?
                            setShowSelector(null) :
                            setShowSelector("saved-images");

                        { savedImages === undefined && fetchSavedImages() }
                    }}>
                    Add from library
                </button>
            </div>
            <div className="select-image__main">
                {
                    showSelector === "from-url" &&
                    <div className="select-image__from-url">
                        <label htmlFor="image" className="select-image__from-url__label">URL</label>
                        <input
                            type="url"
                            name="image"
                            className="select-image__from-url__input"
                            value={imagePreview}
                            onChange={e => setImagePreview(e.target.value)}
                        />

                        {
                            imagePreview &&
                            <>
                                <div className="select-image__from-url__preview-label">Image Preview</div>

                                
                                    <img className="select-image__from-url__preview"
                                        src={imagePreview}
                                        alt="post image"
                                    />
                            </>
                        }

                        <div className='select-image__from-url__options'>
                            <button
                                onClick={() => setShowSelector(null)}
                                className="select-image__from-url__options__button">
                                Cancel
                            </button>
                            <button
                                onClick={saveImageToCloudinary}
                                className="select-image__from-url__options__button">
                                Save Image
                            </button>
                        </div>
                    </div>
                }

                {
                    showSelector === "saved-images" &&
                    <div className="select-image__saved">
                        <div className="select-image__saved__gallery">
                            {
                                savedImages?.resources.map(resource => {
                                    return (
                                        <div key={resource.public_id}
                                            onClick={() => selectFromSavedImages(resource.secure_url)}>
                                            <img
                                                src={resource.secure_url}
                                                alt="image preview"
                                                height={150}
                                                width="auto"
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
            </div>

            {
                image &&
                <img src={image} alt="selected image" className="select-image__selected-image-preview" />
            }
        </div>
    );
};