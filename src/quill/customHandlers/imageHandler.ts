import Quill, { EmitterSource, Range } from "quill";
import * as helpers from "../helpers";

import * as cloudinary from "@/cloudinary";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

let data: cloudinary.ResourceApiResponse | undefined = undefined;

cloudinary.fetchResources().then(r => {
    data = r;
});

export const imageHandler = (quill: Quill) => {

    const destroyImageEditor = () => {
        const overlay = document.querySelector(".ql-overlay");
        const baseCtn = document.querySelector(".ql-base-container");

        if (overlay) {
            overlay.remove();
        }

        if (baseCtn) {
            baseCtn.remove();
        }
    };

    const createImageEditor = (quill: Quill, mode: "create" | "edit") => {
        const { index, length } = quill.getSelection(true);

        /* Create overlay */
        const overlay = helpers.createDiv({ className: "ql-overlay" });

        /* Create a base container */
        const baseContainer = helpers.createDiv({ className: "ql-base-container" });

        document.body.onclick = (e) => {
            const baseContainer = document.querySelector(".ql-base-container");
            const target = e.target as Node;

            if (target.contains(baseContainer)) {
                destroyImageEditor();
            }
        };

        /* Image container (top container) ref. */
        const imageContainer = helpers.createDiv({ className: "ql-image-container" });

        baseContainer.append(imageContainer);

        document.body.append(overlay);
        document.body.append(baseContainer);

        const imagePreviewWrapper = helpers.createDiv({ className: "ql-image-preview-wrapper" });

        const createPreview = ({ width, height, src }: { width: string, height: string, src: string }) => {
            const imageResizeWrapper = helpers.createDiv({ className: "ql-image-resize-wrapper", width, height });
            const imagePreview = helpers.createImagePreview({ className: "ql-image-preview", src });
            imageResizeWrapper.append(imagePreview);
            imagePreviewWrapper.append(imageResizeWrapper);
            helpers.resizeObserver.observe(imageResizeWrapper);
            helpers.setResizable(imageResizeWrapper);
        };

        /* Create src input */
        const srcInput = helpers.createInput({
            className: "ql-image-src-input",
            id: "imageSrcInput",
            name: "imageSrcInput",
            placeholder: "https://example.com",
            type: "text"
        });

        /* Create alt input */
        const altInput = helpers.createInput({
            className: "ql-image-alt-input",
            id: "imageAltInput",
            name: "imageAltInput",
            placeholder: "ex.: A picture of a flower",
            type: "text",
        });

        const widthInput = helpers.createInput({
            className: "ql-image-width-input",
            id: "imageWidthInput",
            name: "imageWidthInput",
            type: "text"
        });

        widthInput.onchange = () => {
            const width = widthInput.value;
            const imageResizeWrapper = document.querySelector(".ql-image-resize-wrapper") as HTMLDivElement;
            if (imageResizeWrapper) {
                imageResizeWrapper.style.width = width + "px";
            }
        };

        const previewImage = () => {
            const existingImagePreview = document.querySelector(".ql-image-preview");
            const existingImageResizeWrapper = document.querySelector(".ql-image-resize-wrapper");

            if (!existingImagePreview) {
                createPreview({ width: "40rem", height: "auto", src: srcInput.value });
            } else {
                existingImagePreview.setAttribute("src", srcInput.value);

                if (!srcInput.value) {
                    if (existingImageResizeWrapper) {
                        existingImageResizeWrapper.remove();
                    }
                }
            }
        };

        srcInput.onchange = previewImage;

        if (mode === "edit") {
            const [leaf, offset] = quill.getLeaf(index);

            if (leaf) {
                const { image } = leaf.value();
                const { src, width, height, alt } = image;
                console.log(src, width, height, alt);

                srcInput.value = src;
                altInput.value = alt;

                createPreview({ width: String(width) + "px", height: String(height), src });
            }
        }

        /* Create confirmation button */
        const saveButton = helpers.createButton({
            className: "ql-button-confirm",
            label: "Ok",
            onClick: () => {
                const imagePreview = document.querySelector(".ql-image-preview");

                if (imagePreview) {
                    if (mode === "create") {
                        quill.insertEmbed(index, "image", {
                            src: srcInput.value,
                            alt: altInput.value,
                            width: imagePreview.clientWidth,
                            height: "auto",
                        }, "user");

                        destroyImageEditor();
                        quill.setSelection({ index, length }, "api");
                    } else if (mode === "edit") {
                        const [leaf, offset] = quill.getLeaf(index);

                        if (leaf) {
                            leaf.replaceWith("image", {
                                src: srcInput.value,
                                alt: altInput.value,
                                width: imagePreview.clientWidth,
                                height: "auto"
                            });

                            destroyImageEditor();
                            quill.setSelection({ index, length }, "api");
                        }
                    }
                }
            }
        });

        /* Create close button */
        const closeButton = helpers.createButton({
            className: "ql-button-close",
            onClick: () => {
                if (imageContainer) {
                    destroyImageEditor();
                }
            }
        });

        const header = helpers.createDiv({ className: "ql-image-container-header" });

        const srcInputWrapper = helpers.createDiv({ className: "ql-src-input-wrapper" });
        const srcLabel = helpers.createInputLabel({ for: "imageSrcInput", text: "Image URL" });

        const altInputWrapper = helpers.createDiv({ className: "ql-alt-input-wrapper" });
        const altLabel = helpers.createInputLabel({ for: "imageAltInput", text: "Image alt text" });

        const widthInputWrapper = helpers.createDiv({ className: "ql-width-input-wrapper" });
        const widthLabel = helpers.createInputLabel({ for: "imageWidthInput", text: "Image width" });

        /* Append created elements */
        imageContainer.append(header);

        header.append(srcInputWrapper);
        srcInputWrapper.append(srcLabel);
        srcInputWrapper.append(srcInput);

        const createSavedImagesGallery = (header: HTMLDivElement) => {
            /* Saved images gallery elements */
            const galleryContainer = helpers.createDiv({ className: "ql-gallery-container" });

            const btnLeft = helpers.createButton({ className: "ql-gallery-btn-left" });
            const btnRight = helpers.createButton({ className: "ql-gallery-btn-right" });
            const gallery = helpers.createDiv({ className: "ql-gallery" });

            galleryContainer.append(btnLeft);
            galleryContainer.append(gallery);
            galleryContainer.append(btnRight);

            if (data) {
                console.log(data.resources);

                data.resources.forEach(image => {
                    const imagePreview = helpers.createImagePreview({
                        className: "ql-gallery-item-image",
                        src: image.secure_url,
                    });
                    const galleryItemBtnBackground = helpers.createDiv({ className: "ql-gallery-item-button-background" });
                    const galleryItem = helpers.createDiv({ className: "ql-gallery-item" });
                    galleryItem.append(imagePreview);
                    const btnDelete = helpers.createButton({ className: "ql-button-delete" });
                    galleryItemBtnBackground.append(btnDelete);
                    galleryItem.append(galleryItemBtnBackground);
                    gallery.append(galleryItem);

                    const srcInput = document.querySelector(".ql-image-src-input") as HTMLInputElement;

                    imagePreview.onclick = () => {
                        console.log(image);
                        srcInput.value = image.secure_url;
                        previewImage();
                    };
                });
            }

            header.append(galleryContainer);
        };

        createSavedImagesGallery(header);

        header.append(altInputWrapper);
        altInputWrapper.append(altLabel);
        altInputWrapper.append(altInput);

        header.append(widthInputWrapper);
        widthInputWrapper.append(widthLabel);
        widthInputWrapper.append(widthInput)

        header.append(saveButton);
        imageContainer.append(closeButton);
        imageContainer.append(imagePreviewWrapper);

        const createGalleryEventHandlers = () => {
            /* Gallery event handlers */
            const galleryCtn = document.querySelector(".ql-gallery");
            const btnLeft = document.querySelector(".ql-gallery-btn-left") as HTMLButtonElement;
            const btnRight = document.querySelector(".ql-gallery-btn-right") as HTMLButtonElement;
            if (galleryCtn) {
                if (btnLeft) {
                    btnLeft.onclick = () => {
                        galleryCtn.scrollBy({
                            behavior: "smooth",
                            left: -galleryCtn.clientWidth,
                            top: 0
                        });
                    };
                }

                if (btnRight) {
                    btnRight.onclick = () => {
                        galleryCtn.scrollBy({
                            behavior: "smooth",
                            left: galleryCtn.clientWidth,
                            top: 0
                        });
                    };
                }
            }
        }

        createGalleryEventHandlers();

        srcInput.focus();
    };

    const onSelectionChange = (range: Range, oldRange: Range, source: EmitterSource) => {
        const removeButton = () => {
            const el = document.querySelector(".ql-floating-div");
            if (el) {
                el.remove();
            }
        };

        if (quill.isEnabled() && quill.hasFocus()) {

            removeButton();

            if (range) {
                const { index, length } = range;
                const [leaf, offset] = quill.getLeaf(index);

                if (leaf && leaf.domNode.nodeName.toLowerCase() === "img" && length > 0) {
                    console.log("We have an image.");

                    /* Create "edit image" button */
                    const editButton = helpers.createButton({
                        className: "ql-button-edit-image",
                        label: "Edit Image",
                        onClick: () => {
                            createImageEditor(quill, "edit");
                        },
                    });

                    /* Create "remove image" button */
                    const removeButton = helpers.createButton({
                        className: "ql-button-remove-image",
                        label: "Remove Image",
                        onClick: () => {
                            leaf.remove();
                        },
                    });

                    const bounds = quill.getBounds(index);

                    if (bounds) {
                        const floatingDiv = helpers.createDiv({ className: "ql-floating-div", height: String(bounds.height) + "px" });
                        document.querySelector(".ql-container")?.append(floatingDiv);
                        floatingDiv.style.top = String(bounds.top) + "px";
                        floatingDiv.style.left = String(bounds.left) + "px";
                        floatingDiv.style.right = String(bounds.right) + "px";
                        floatingDiv.append(editButton);
                        floatingDiv.append(removeButton);
                    }

                } else {
                    removeButton();
                }
            }
        } else {
            removeButton();
        }
    };

    quill.on("selection-change", onSelectionChange);

    return () => {
        const imageContainer = document.querySelector("ql-image-container");
        if (!imageContainer) {
            createImageEditor(quill, "create");
        } else {
            destroyImageEditor();
        }
    };
};