import { EmbedBlot } from "parchment";


class BlockQuote extends EmbedBlot {
    static blotName = "blockquote";
    static tagName = "FIGURE";
    static className: string = "ql-blockquote-block-container";

    static create(value: {
        quote: string,
        author: string,
        citation: string,
    }) {
        const node = super.create() as Element;

        node.setAttribute("contenteditable", "false");
        node.setAttribute("data-figure-quote", value.quote);
        node.setAttribute("data-figure-author", value.author);
        node.setAttribute("data-figure-citation", value.citation);

        const blockquote = document.createElement("BLOCKQUOTE");
        blockquote.textContent = value.quote;

        const figCaption = document.createElement("FIGCAPTION");
        const cite = document.createElement("CITE");
        cite.textContent = value.citation;

        const author = document.createElement("SPAN");
        author.className = "ql-quote-author";
        author.textContent = value.author;

        figCaption.append(author, cite);
        node.append(blockquote, figCaption);
        return node;
    }

    static value(node: Element) {
        return {
            quote: node.getAttribute("data-figure-quote"),
            author: node.getAttribute("data-figure-author"),
            citation: node.getAttribute("data-figure-citation"),
        };
    }
}

export default BlockQuote;