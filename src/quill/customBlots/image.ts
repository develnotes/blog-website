import { EmbedBlot } from "parchment";


class Image extends EmbedBlot {
    static blotName = "image";
    static tagName = "FIGURE";
    static className: string = "ql-image-block-container";

    static create(value: {
        src: string,
        alt: string,
        width: string,
        height: string,
        caption: string,
    }) {
        const node = super.create() as Element;
        node.setAttribute("contenteditable", "false");
        node.setAttribute("data-figure-src", value.src);
        node.setAttribute("data-figure-alt", value.alt);
        node.setAttribute("data-figure-width", value.width);
        node.setAttribute("data-figure-height", value.height);
        node.setAttribute("data-figure-caption", value.caption);
        const image = document.createElement("img");
        image.setAttribute("src", value.src);
        image.setAttribute("alt", value.alt);
        image.setAttribute("width", value.width);
        image.setAttribute("height", value.height);
        const figCaption = document.createElement("figcaption");
        figCaption.textContent = value.caption;
        node.append(image, figCaption);        
        return node;
    }

    static value(node: Element) {
        return {
            src: node.getAttribute("data-figure-src"),
            alt: node.getAttribute("data-figure-alt"),
            width: node.getAttribute("data-figure-width"),
            height: node.getAttribute("data-figure-height"),
            caption: node.getAttribute("data-figure-caption"),
        };
    }
}

export default Image;