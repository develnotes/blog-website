import Quill from "quill";

import * as helpers from "../helpers";

import Link from "../customFormats/link";
Quill.register(Link);

import { Leaf } from "parchment";

import BlockHandler from "./handler";

const FORMAT = "anchor";
const elementName = "hyperlink";


class HyperlinkHandler extends BlockHandler {

    elementName: string = elementName;
    format: string = FORMAT;
    autoCloseElements: string[] = [`.ql-${elementName}-inline-overlay`];

    createEditor(quill: Quill, mode: "create" | "edit", leaf?: Leaf): void {

        super.createEditor(quill, mode, leaf);

        const { saveButton, closeButton } = helpers.createContainerElements(elementName);

        const hrefInput = helpers.createElement.input({
            className: `ql-${elementName}-href-input`,
            id: "hrefInput",
            name: "hrefInput",
            placeholder: "https://example.com",
            type: "text"
        });

        const textInput = helpers.createElement.input({
            className: `ql-${elementName}-text-input`,
            id: "textInput",
            name: "textInput",
            placeholder: "ex.: example",
            type: "text",
        });

        if (mode === "edit") {
            if (leaf) {
                const link = leaf.domNode as HTMLLinkElement;
                hrefInput.value = link.getAttribute("href") as string;
                textInput.value = link.textContent as string;
            }
        }

        saveButton.onclick = () => {
            if (mode === "create") {
                quill.insertEmbed(this.index, "anchor", {
                    href: hrefInput.value,
                    text: textInput.value,
                }, "user");
            } else if (mode === "edit") {
                if (leaf) {
                    leaf.replaceWith("anchor", {
                        href: hrefInput.value,
                        text: textInput.value,
                    });
                }
            }
            this.destroyContainer();
        };

        closeButton.onclick = () => this.destroyContainer();

        const hrefInputWrapper = helpers.createElement.div({ className: `ql-${elementName}-href-input-wrapper` });
        const hrefLabel = helpers.createElement.label({ htmlFor: "hrefInput", textContent: "HRef" });
        hrefInputWrapper.append(hrefLabel, hrefInput);

        const textInputWrapper = helpers.createElement.div({ className: `ql-${elementName}-text-input-wrapper` });
        const textLabel = helpers.createElement.label({ htmlFor: "textInput", textContent: "Text" });
        textInputWrapper.append(textLabel, textInput);

        this.container.append(hrefInputWrapper, textInputWrapper, saveButton, closeButton);
        hrefInput.focus();
    }

    createControls({ quill, index, leaf, }: { quill: Quill; index: number; leaf: Leaf; }): void {
        const { editButton, removeButton, removeFloatingDiv } = helpers.createFloatingDivControls(elementName);

        removeFloatingDiv();

        editButton.onclick = () => this.createEditor(quill, "edit", leaf);

        removeButton.onclick = () => {
            leaf.remove();
            removeFloatingDiv();
        };

        const bounds = quill.getBounds(index);

        if (bounds) {
            const element = leaf.domNode as HTMLElement;
            helpers.createElementOverlay(element, elementName);
            helpers.createFloatingDiv(elementName, { elements: [editButton, removeButton], inline: true, element, bounds });
        }
    }
}

const hyperlinkHandler = new HyperlinkHandler();

export const handlerType = hyperlinkHandler.format as string;
export const handler = hyperlinkHandler.handler;
