import Quill from "quill";

import * as helpers from "../helpers";

import * as cloudinary from "@/cloudinary";

/* Cropper js */
import "cropperjs/dist/cropper.css";
///import Cropper from "cropperjs";

import Image from "../customBlots/image";
Quill.register(Image);

import { Leaf } from "parchment";
import BlockHandler from "./handler";

let data: cloudinary.ResourceApiResponse | undefined = undefined;

const FORMAT = "image";
const elementName = "image";


class ImageHandler extends BlockHandler {
    elementName: string | undefined = elementName;
    format: string | undefined = FORMAT;

    createEditor = (quill: Quill, mode: "create" | "edit", leaf?: Leaf) => {

        super.createEditor(quill, mode, leaf);

        const { saveButton, closeButton } = helpers.createContainerElements(elementName);

        const imagePreviewWrapper = helpers.createElement.div({ className: `ql-${elementName}-preview-wrapper` });

        const createPreview = ({ width, height, src }: { width: string, height: string, src: string }) => {
            const imageResizeWrapper = helpers.createElement.div({ className: `ql-${elementName}-resize-wrapper`, style: { width, height } });
            const imagePreview = helpers.createElement.img({ className: `ql-${elementName}-preview`, src });
            imageResizeWrapper.append(imagePreview);
            imagePreviewWrapper.append(imageResizeWrapper);
            helpers.resizeObserver.observe(imageResizeWrapper);
            helpers.setResizable(imageResizeWrapper);
        };

        /* Create src input */
        const srcInput = helpers.createElement.input({
            className: `ql-${elementName}-src-input`,
            id: "imageSrcInput",
            name: "imageSrcInput",
            placeholder: "https://example.com",
            type: "text"
        });

        /* Create alt input */
        const altInput = helpers.createElement.input({
            className: `ql-${elementName}-alt-input`,
            id: "imageAltInput",
            name: "imageAltInput",
            placeholder: "ex.: A picture of a flower",
            type: "text",
        });

        const widthInput = helpers.createElement.input({
            className: `ql-${elementName}-width-input`,
            id: "imageWidthInput",
            name: "imageWidthInput",
            type: "text"
        });

        const captionInput = helpers.createElement.input({
            className: `ql-${elementName}-caption-input`,
            id: "imageCaptionInput",
            name: "imageCaptionInput",
            placeholder: "ex. A flower",
            type: "text",
        });

        widthInput.onchange = () => {
            const width = widthInput.value;
            const imageResizeWrapper = document.querySelector(`.ql-${elementName}-resize-wrapper`) as HTMLDivElement;
            if (imageResizeWrapper) {
                imageResizeWrapper.style.width = width + "px";
            }
        };

        const previewImage = () => {
            const existingImagePreview = document.querySelector(`.ql-${elementName}-preview`);
            const existingImageResizeWrapper = document.querySelector(`.ql-${elementName}-resize-wrapper`);

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

        /* When in edit mode */
        if (mode === "edit") {

            if (leaf) {
                const figure = leaf.domNode as HTMLElement;
                const width = figure.getAttribute("data-figure-width") as string;
                const height = figure.getAttribute("data-figure-heigh") as string;
                const src = figure.getAttribute("data-figure-src") as string;
                const alt = figure.getAttribute("data-figure-alt") as string;
                const caption = figure.getAttribute("data-figure-caption") as string;

                srcInput.value = src;
                altInput.value = alt;
                captionInput.value = caption;

                createPreview({ width: String(width) + "px", height: String(height), src });
            }
        }

        /* Create confirmation button */
        saveButton.onclick = () => {
            const imagePreview = document.querySelector(`.ql-${elementName}-preview`);

            if (imagePreview) {
                if (mode === "create") {
                    quill.insertEmbed(this.index, "image", {
                        src: srcInput.value,
                        alt: altInput.value,
                        width: imagePreview.clientWidth,
                        caption: captionInput.value,
                        height: "auto",
                    }, "user");

                    quill.setSelection({ index: this.index, length: 0 }, "api");
                    quill.insertText(this.index, "", "api");
                    helpers.destroyEditor();
                } else if (mode === "edit") {
                    if (leaf) {
                        leaf.replaceWith("image", {
                            src: srcInput.value,
                            alt: altInput.value,
                            caption: captionInput.value,
                            width: imagePreview.clientWidth,
                            height: "auto",
                        });

                        quill.setSelection({ index: this.index, length: 0 }, "api");
                        quill.insertText(this.index, "", "api");
                        helpers.destroyEditor();
                    }
                }
            }
        };

        /* Create close button */
        closeButton.onclick = () => this.destroyContainer();

        const header = helpers.createElement.div({ className: `ql-${elementName}-container-header` });

        const srcInputWrapper = helpers.createElement.div({ className: "ql-src-input-wrapper" });
        const srcLabel = helpers.createElement.label({ htmlFor: "imageSrcInput", textContent: "Image URL" });

        const altInputWrapper = helpers.createElement.div({ className: "ql-alt-input-wrapper" });
        const altLabel = helpers.createElement.label({ htmlFor: "imageAltInput", textContent: "Image alt text" });

        const widthInputWrapper = helpers.createElement.div({ className: "ql-width-input-wrapper" });
        const widthLabel = helpers.createElement.label({ htmlFor: "imageWidthInput", textContent: "Image width" });

        const captionInputWrapper = helpers.createElement.div({ className: "ql-caption-input-wrapper" });
        const captionLabel = helpers.createElement.label({ htmlFor: "captionWidthInput", textContent: "Caption" });

        /* Append created elements */
        this.container.append(header);

        header.append(srcInputWrapper);
        srcInputWrapper.append(srcLabel, srcInput);

        const createSavedImagesGallery = (header: HTMLDivElement) => {
            /* Saved images gallery elements */
            const galleryContainer = helpers.createElement.div({ className: "ql-gallery-container" });

            const btnLeft = helpers.createElement.button({ className: "ql-gallery-btn-left" });
            const btnRight = helpers.createElement.button({ className: "ql-gallery-btn-right" });
            const gallery = helpers.createElement.div({ className: "ql-gallery" });

            galleryContainer.append(btnLeft);
            galleryContainer.append(gallery);
            galleryContainer.append(btnRight);

            cloudinary.fetchResources().then(r => {
                data = r;

                if (data) {
                    data.resources.forEach(image => {
                        const imagePreview = helpers.createElement.img({
                            className: `ql-gallery-item-${elementName}`,
                            src: image.secure_url,
                        });
                        const galleryItemBtnBackground = helpers.createElement.div({ className: "ql-gallery-item-button-background" });
                        const galleryItem = helpers.createElement.div({ className: "ql-gallery-item" });
                        galleryItem.append(imagePreview);
                        const btnDelete = helpers.createElement.button({ className: "ql-button-delete" });
                        galleryItemBtnBackground.append(btnDelete);
                        galleryItem.append(galleryItemBtnBackground);
                        gallery.append(galleryItem);

                        const srcInput = document.querySelector(`.ql-${elementName}-src-input`) as HTMLInputElement;

                        imagePreview.onclick = () => {
                            srcInput.value = image.secure_url;
                            previewImage();
                        };
                    });
                }
            });


            header.append(galleryContainer);

            const createGalleryEventHandlers = () => {
                /* Gallery event handlers */
                const galleryCtn = document.querySelector(".ql-gallery");

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
            };

            createGalleryEventHandlers();
        };

        createSavedImagesGallery(header);

        altInputWrapper.append(altLabel, altInput);
        widthInputWrapper.append(widthLabel, widthInput)
        captionInputWrapper.append(captionLabel, captionInput)
        header.append(altInputWrapper, widthInputWrapper, captionInputWrapper, saveButton);
        this.container.append(closeButton, imagePreviewWrapper);
        srcInput.focus();
    }

    createControls = ({
        quill,
        index,
        leaf,
    }: {
        quill: Quill
        index: number,
        leaf: Leaf,
    }) => {

        const { editButton, removeButton, closeButton, removeFloatingDiv } = helpers.createFloatingDivControls(elementName);

        removeFloatingDiv();

        editButton.onclick = () => this.createEditor(quill, "edit", leaf);

        removeButton.onclick = () => {
            leaf.remove();
            removeFloatingDiv();
        };

        closeButton.onclick = () => removeFloatingDiv();

        const bounds = quill.getBounds(index);

        if (bounds) {
            helpers.createFloatingDiv(elementName, { elements: [closeButton, editButton, removeButton], bounds });
        }
    }
}

const imageHandler = new ImageHandler();
export const handlerType = imageHandler.format as string;
export const handler = imageHandler.handler;
