/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

import { IconPhotoPlus } from "@tabler/icons-react";
import { MainEditorOverlayModal } from "./MainEditorOverlayModal";

export const PostHeaderImageSelector = ({
    image,
    setImage,
}: {
    image: string,
    setImage: React.Dispatch<React.SetStateAction<string>>,
}) => {

    /* Open  */
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="select-image-container">
            <button className="select-image-container__button-open"
                onClick={() => setOpen(true)}>
                <IconPhotoPlus />
                <div>Add Image</div>
            </button>

            {/* Preview selected image */}
            <ImagePreview image={image} />

            {/* Image editor (Main/first Modal) */}
            <MainEditorOverlayModal
                open={open}
                setOpen={setOpen}
                image={image}
                setImage={setImage}
            />
        </div>
    );
};


/* Image preview component */
const ImagePreview = ({ image }: { image: string }) => {
    if (!image) return null;
    return (
        <div className="select-image__preview">
            <img
                className="select-image__preview__image"
                src={image}
                alt="selected image"
            />
        </div>
    );
};
