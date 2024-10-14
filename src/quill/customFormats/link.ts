import { EmbedBlot } from "parchment";


class HyperLink extends EmbedBlot {

    static blotName: string = "anchor";
    static tagName: string | string[] = "A";
    static className: string = "ql-hyperlink-block-container";

    static create(value: {
        href: string,
        text: string,
    }) {
        const node = super.create() as HTMLLinkElement;
        //node.setAttribute("contenteditable", "false");
        node.setAttribute("href", value.href);
        node.textContent = value.text;
        return node;
    }

    static formats() {
        return true;
    }

    static value(node: HTMLLinkElement) {
        return {
            href: node.getAttribute("href"),
            text: node.textContent,
        };
    }
}

export default HyperLink;