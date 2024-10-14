import Quill from "quill";

import * as helpers from "../helpers";

import BlockQuote from "../customBlots/blockquote";
Quill.register(BlockQuote);

import { Blot, Leaf } from "parchment";
import BlockHandler from "./handler";

const FORMAT = "blockquote";
const elementName = "blockquote";


class BlockQuoteHandler extends BlockHandler {

    elementName: string | undefined = elementName;
    format: string | undefined = FORMAT;

    createEditor = (quill: Quill, mode: "create" | "edit", leaf?: Leaf) => {
        
        super.createEditor(quill, mode, leaf);
    
        const { saveButton, closeButton } = helpers.createContainerElements(elementName);
    
        /* Create src input */
        const quoteInput = helpers.createElement.input({
            className: "ql-quote-input",
            id: "quoteInput",
            name: "quoteInput",
            placeholder: "https://example.com",
            type: "text"
        });
    
        /* Create alt input */
        const authorInput = helpers.createElement.input({
            className: "ql-author-input",
            id: "authorInput",
            name: "authorInput",
            placeholder: "ex.: A. Einstein",
            type: "text",
        });
    
        const citationInput = helpers.createElement.input({
            className: "ql-citation-input",
            id: "citationInput",
            name: "citationInput",
            type: "text"
        });
    
        /* When in edit mode */
        if (mode === "edit") {
    
            if (leaf) {
                const figure = leaf.domNode as HTMLElement;
                const quote = figure.getAttribute("data-figure-quote") as string;
                const citation = figure.getAttribute("data-figure-citation") as string;
                const author = figure.getAttribute("data-figure-author") as string;
    
                quoteInput.value = quote;
                citationInput.value = citation;
                authorInput.value = author;
            }
        }
    
        /* Create confirmation button */
        saveButton.onclick = () => {
            if (mode === "create") {
                quill.insertEmbed(this.index, "blockquote", {
                    quote: quoteInput.value,
                    citation: citationInput.value,
                    author: authorInput.value,
                }, "user");
                quill.setSelection({ index: this.index, length: 0 }, "api");
                quill.insertText(this.index, "", "api");
                helpers.destroyEditor();
            } else if (mode === "edit") {
                if (leaf) {
                    leaf.replaceWith("blockquote", {
                        quote: quoteInput.value,
                        citation: citationInput.value,
                        author: authorInput.value,
                    });
                    quill.setSelection({ index: this.index, length: 0 }, "api");
                    quill.insertText(this.index, "", "api");
                    helpers.destroyEditor();
                }
            }
        };
    
        /* Create close button */
        closeButton.onclick = () => {
            if (this.container) {
                helpers.destroyEditor();
            }
        };
    
        const quoteInputWrapper = helpers.createElement.div({ className: "ql-quote-input-wrapper" });
        const quoteLabel = helpers.createElement.label({ htmlFor: "quoteInput", textContent: "Quote" });
        quoteInputWrapper.append(quoteLabel, quoteInput);
    
        const citationInputWrapper = helpers.createElement.div({ className: "ql-citation-input-wrapper" });
        const citationLabel = helpers.createElement.label({ htmlFor: "citationInput", textContent: "Citation" });
        citationInputWrapper.append(citationLabel, citationInput);
    
        const authorInputWrapper = helpers.createElement.div({ className: "ql-author-input-wrapper" });
        const authorLabel = helpers.createElement.label({ htmlFor: "authorInput", textContent: "Author" });
        authorInputWrapper.append(authorLabel, authorInput)
    
        this.container.append(quoteInputWrapper, citationInputWrapper, authorInputWrapper, saveButton, closeButton);
    
        quoteInput.focus();
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

const blockQuoteHandler = new BlockQuoteHandler();
export const handlerType = blockQuoteHandler.format as string;
export const handler = blockQuoteHandler.handler;