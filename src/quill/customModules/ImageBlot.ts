import { EmbedBlot } from "parchment";


class ImageBlot extends EmbedBlot {
    static blotName = "image";
    static tagName = "img";

    static create(value: {
        src: string,
        alt: string,
        width: string,
        height: string,

    }) {
        const node = super.create() as Element;
        node.setAttribute("src", value.src);
        node.setAttribute("alt", value.alt);
        node.setAttribute("width", value.width);
        node.setAttribute("height", value.height);
        return node;
    }

    static value(node: Element) {
        return {
            src: node.getAttribute("src"),
            alt: node.getAttribute("alt"),
            width: node.getAttribute("width"),
            height: node.getAttribute("height"),
        };
    }
}

export default ImageBlot;