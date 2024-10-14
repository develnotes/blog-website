"use client"

/* Quill */
import Quill from "quill";
import { Blot, Leaf, LeafBlot } from "parchment";

import Latex, { LatexBlotValue, LatexDisplayMode } from "../customBlots/latex";
Quill.register(Latex);

import * as helpers from "@/quill/helpers";

/* Ace */
import ace, { edit } from "../../../ace/ace-builds/src-noconflict/ace";
import { Ace } from "../../../ace/ace-builds/ace";
import theme from "../../../ace/ace-builds/src-noconflict/theme-ambiance";
import latex from "../../../ace/ace-builds/src-noconflict/mode-latex";
import "../../../ace/ace-builds/src-noconflict/ext-language_tools";
import "../../../ace/ace-builds/src-noconflict/ext-searchbox";

/* Katex */
import { renderKatex } from "../katex";

import katex from "katex";
import BlockHandler from "./handler";


const startAce = ({ latexFormula }: { latexFormula?: string }) => {
    const aceEditor: Ace.Editor = edit("ace-editor", {
        enableAutoIndent: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        enableMultiselect: true,
        fontSize: 16,
        theme,
        value: latexFormula || "",
        tooltipFollowsMouse: true,
        tabSize: 4,
        wrap: true,
    } as Ace.EditorOptions);

    aceEditor.session.setMode(new latex.Mode());
    aceEditor.focus();

    return aceEditor;
};

const FORMAT = "formula";
const elementName = "latex";


class LatexHandler extends BlockHandler {
    elementName: string | undefined = elementName;
    format: string | undefined = FORMAT;
    autoCloseElements: string[] = [`.ql-${elementName}-inline-overlay`];

    createEditor = (quill: Quill, mode: "create" | "edit", leaf?: Leaf) => {

        super.createEditor(quill, mode, leaf);

        const { saveButton, closeButton } = helpers.createContainerElements(elementName);

        const latexPreviewWrapper = helpers.createElement.div({ className: `ql-${elementName}-preview-wrapper` });

        const form = helpers.createElement.form({
            className: `ql-${elementName}-display-mode-form`
        });

        const radioItemInline = helpers.createElement.span({
            className: "ql-radio-item",
        });

        form.append(radioItemInline);

        const radioButtonInline = helpers.createElement.input({
            className: "ql-radio-button",
            id: "inline",
            name: "displaymode",
            type: "radio",
            value: "inline",
        });

        const inlineLabel = helpers.createElement.label({
            htmlFor: "inline",
            textContent: "Inline"
        });

        radioItemInline.append(inlineLabel, radioButtonInline);

        const radioItemDisplay = helpers.createElement.span({ className: "ql-radio-item" });

        form.append(radioItemDisplay);

        const radioButtonDisplay = helpers.createElement.input({
            className: "ql-radio-button",
            id: "display",
            name: "displaymode",
            type: "radio",
            value: "display"
        });

        const displayLabel = helpers.createElement.label({
            htmlFor: "display",
            textContent: "Display",
        });

        radioItemDisplay.append(displayLabel, radioButtonDisplay);

        let formula = "";
        let displayMode: LatexDisplayMode = "display";

        if (mode === "edit") {
            if (leaf) {
                const element = leaf.domNode as HTMLElement;
                formula = element.getAttribute("data-latex-formula") as string;
                displayMode = element.getAttribute("data-display-mode") as LatexDisplayMode;
            }
        }

        if (displayMode === "display") {
            radioButtonDisplay.checked = true;
        } else {
            radioButtonInline.checked = true;
        }

        form.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            displayMode = target.value as LatexDisplayMode;
            updateResultPreview();
        };

        const header = helpers.createElement.div({ className: `ql-${elementName}-container-header` });

        header.append(form, saveButton);

        this.container.append(header, closeButton);

        const aceEditorComponent = helpers.createElement.div({
            className: "ql-ace-editor",
            id: "ace-editor",
        });

        const resultPreview = helpers.createElement.div({
            className: `ql-${elementName}-result-preview`
        });

        latexPreviewWrapper.append(aceEditorComponent);

        this.container.append(latexPreviewWrapper, resultPreview);

        /* Load external code editor */
        const aceEditor = startAce({ latexFormula: formula });

        aceEditor.on("input", () => {
            updateResultPreview();
        });

        aceEditor.on("change", () => {
            updateResultPreview();
        });

        const updateResultPreview = () => {
            resultPreview.innerHTML = katex.renderToString(aceEditor.getSession().getValue(), {
                displayMode: displayMode === "display" ? true : false,
                throwOnError: false,
            });
        };

        saveButton.onclick = () => {
            /* Get edited and formated code */
            const formula = aceEditor.getSession().getValue();

            const l = formula.length;

            if (mode === "create") {
                const latexBlot: LatexBlotValue = {
                    displayMode,
                    latexFormula: formula,
                };

                if (this.index) {
                    quill.insertEmbed(this.index, "formula", latexBlot, "api");

                    if (displayMode === "display") {
                        quill.insertText(this.index + 1, "\n");
                    } else {
                        quill.insertText(this.index + 1, " ");
                    }
                    this.destroyContainer();
                }

            } else if (mode === "edit") {
                if (leaf) {
                    const latexBlot: LatexBlotValue = {
                        displayMode,
                        latexFormula: formula,
                    };
                    leaf.replaceWith("formula", latexBlot);
                    this.destroyContainer();
                }
            }

            renderKatex();
        };

        closeButton.onclick = () => this.destroyContainer();
    }

    createControls = ({
        quill,
        index,
        leaf,
    }: {
        quill: Quill,
        index: number,
        leaf: LeafBlot,
    }) => {

        const { editButton, removeButton, closeButton, removeFloatingDiv } = helpers.createFloatingDivControls(elementName);

        removeFloatingDiv();

        /* Create "edit image" button */
        editButton.onclick = () => this.createEditor(quill, "edit", leaf);

        /* Create "remove image" button */
        removeButton.onclick = () => {
            leaf.remove();
            removeFloatingDiv();
        };

        closeButton.onclick = () => removeFloatingDiv();

        const bounds = quill.getBounds(index);

        if (bounds) {
            const element = leaf.domNode as HTMLElement;
            const displayMode = element.getAttribute("data-display-mode");

            if (displayMode === "inline") {
                helpers.createElementOverlay(element, elementName);
                helpers.createFloatingDiv(elementName, {
                    elements: [closeButton, editButton, removeButton],
                    inline: true,
                    element,
                    bounds,
                });
            }

            if (displayMode === "display") {
                helpers.createFloatingDiv(elementName, { elements: [closeButton, editButton, removeButton], bounds });
            }
        }
    }
}

const latexHandler = new LatexHandler();
export const handlerType = latexHandler.format as string;
export const handler = latexHandler.handler;