"use client";

import Quill from "quill";
import * as helpers from "@/quill/helpers";

/* Ace */
import { Ace } from "../../../ace/ace-builds/ace";
import ace, { edit } from "../../../ace/ace-builds/src-noconflict/ace";
import "../../../ace/ace-builds/src-noconflict/ext-language_tools";
import "../../../ace/ace-builds/src-noconflict/ext-searchbox";
import "../../../ace/ace-builds/src-noconflict/ext-emmet";
import theme from "../../../ace/ace-builds/src-noconflict/theme-monokai";
import javascript from "../../../ace/ace-builds/src-noconflict/mode-javascript";
import python from "../../../ace/ace-builds/src-noconflict/mode-python";
import typescript from "../../../ace/ace-builds/src-noconflict/mode-javascript";
import html from "../../../ace/ace-builds/src-noconflict/mode-html";
import css from "../../../ace/ace-builds/src-noconflict/mode-css";

/* Highlight JS for code module */
import hljs from "highlight.js";

import Code from "../customBlots/code";
Quill.register(Code);

import { Blot, Leaf } from "parchment";
import BlockHandler from "./handler";

const JavascriptMode = javascript.Mode;
const PythonMode = python.Mode;
const TypescriptMode = typescript.Mode;
const HtmlMode = html.Mode;
const CssMode = css.Mode;

const languages = [
    { name: "javascript", mode: JavascriptMode },
    { name: "python", mode: PythonMode },
    { name: "typescript", mode: TypescriptMode },
    { name: "html", mode: HtmlMode },
    { name: "css", mode: CssMode },
];

const startAce = (code: string, language: string) => {

    const aceEditor: Ace.Editor = edit("ace-editor", {
        enableAutoIndent: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        enableMultiselect: true,
        fontSize: 16,
        theme,
        value: code,
        tooltipFollowsMouse: true,
        tabSize: 4,
    } as Ace.EditorOptions);

    aceEditor.focus();

    languages.forEach(l => {
        if (l.name === language) {
            aceEditor.session.setMode(new l.mode());
        }
    });

    return aceEditor;
};

const FORMAT = "code-block";
const elementName = "code";


class CodeHandler extends BlockHandler {
    elementName: string | undefined = elementName;
    format: string | undefined = FORMAT;

    createEditor = (quill: Quill, mode: "create" | "edit", leaf?: Leaf) => {

        super.createEditor(quill, mode, leaf);

        const { saveButton, closeButton } = helpers.createContainerElements(elementName);

        const codePreviewWrapper = helpers.createElement.div({ className: `ql-${elementName}-preview-wrapper` });

        /* Create select with options */
        const selectButton = helpers.createElement.select();
        selectButton.className = "ql-select-language";

        languages.forEach(l => {
            const option = helpers.createElement.option({
                value: l.name,
                innerText: l.name
            });
            selectButton.append(option);
        });

        let code = "";
        let language = "javascript"; /* default language */

        if (mode === "edit") {
            if (leaf) {
                const element = leaf.domNode as HTMLElement;
                code = element.firstElementChild?.firstElementChild?.textContent as string;
                language = element.getAttribute("data-language") as string;
            }
        }

        selectButton.value = language;

        const header = helpers.createElement.div({ className: `ql-${elementName}-container-header` });
        header.append(selectButton, saveButton);

        this.container.append(header, closeButton);

        const aceEditorComponent = helpers.createElement.div({
            className: "ql-ace-editor",
            id: "ace-editor",
        });

        codePreviewWrapper.append(aceEditorComponent);
        this.container.append(codePreviewWrapper);

        /* Load external code editor */
        const aceEditor = startAce(code, language);

        selectButton.onchange = (ev) => {
            if (ev.target) {
                const target = ev.target as HTMLSelectElement;

                language = target.value;

                languages.forEach(l => {
                    if (l.name === language) {
                        aceEditor.session.setMode(new l.mode());
                    }
                });
            }
        };

        saveButton.onclick = () => {
            /* Get edited and formated code */
            code = aceEditor.getSession().getValue();

            if (mode === "create") {
                quill.insertEmbed(this.index, "code-block", { code, language }, "api");
                quill.setSelection({ index: this.index, length: 0 }, "api");
                quill.insertText(this.index, "", "api");
                helpers.destroyEditor();
            } else if (mode === "edit") {
                if (leaf) {
                    leaf.replaceWith("code-block", {
                        code,
                        language,
                    });

                    quill.setSelection({ index: this.index, length: 0 }, "api");
                    quill.insertText(this.index, "", "api");
                    this.destroyContainer();
                }
            }

            helpers.queryAllElements("code").forEach(el => {
                const element = el as HTMLElement;
                if (!element.dataset.highlighted) {
                    hljs.highlightElement(element);
                }
            });
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
        leaf: Leaf
    }) => {

        const { editButton, removeButton, closeButton, removeFloatingDiv } = helpers.createFloatingDivControls(elementName);

        removeFloatingDiv();

        editButton.onclick = () => this.createEditor(quill, "edit", leaf);

        removeButton.onclick = () => {
            leaf.remove()
            removeFloatingDiv();
        };

        closeButton.onclick = () => removeFloatingDiv();

        const bounds = quill.getBounds(index);

        if (bounds) {
            helpers.createFloatingDiv(elementName, { elements: [closeButton, editButton, removeButton], bounds });
        }
    }
}

const codeHandler = new CodeHandler();
export const handlerType = codeHandler.format as string;
export const handler = codeHandler.handler;