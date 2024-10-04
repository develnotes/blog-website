"use client";

import Quill, { EmitterSource, Range } from "quill";
import * as helpers from "@/quill/helpers";
import { Ace } from "@/ace/ace-builds/ace";
//import * as ace from "@/ace/ace-builds/src-noconflict/ace";
import ace, { edit } from "@/ace/ace-builds/src-noconflict/ace";
import "@/ace/ace-builds/src-noconflict/ext-language_tools";
import "@/ace/ace-builds/src-noconflict/ext-searchbox";
import "@/ace/ace-builds/src-noconflict/ext-emmet";
import theme from "@/ace/ace-builds/src-noconflict/theme-monokai";
import javascript from "@/ace/ace-builds/src-noconflict/mode-javascript";
import python from "@/ace/ace-builds/src-noconflict/mode-python";
import typescript from "@/ace/ace-builds/src-noconflict/mode-javascript";
import html from "@/ace/ace-builds/src-noconflict/mode-html";
import css from "@/ace/ace-builds/src-noconflict/mode-css";
import CodeBlot from "../customModules/codeBlot";
import { HLJSApi } from "highlight.js";

Quill.register(CodeBlot);

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

        //showLineNumbers: false

    } as Ace.EditorOptions);

    languages.forEach(l => {
        if (l.name === language) {
            aceEditor.session.setMode(new l.mode());
        }
    });

    return aceEditor;
};

export const codeHandler = (quill: Quill, hljs: HLJSApi) => {

    console.log("Loaded code handler");

    const destroyCodeEditor = () => {
        const overlay = document.querySelector(".ql-overlay");
        const baseCtn = document.querySelector(".ql-base-container");

        if (baseCtn) {
            baseCtn.remove();
        }

        if (overlay) {
            overlay.remove();
        }
    };

    const createCodeEditor = (quill: Quill, editMode: "create" | "edit", code: string, language: string) => {

        const { index, length } = quill.getSelection(true);

        /* Create overlay */
        const overlay = helpers.createDiv({ className: "ql-overlay" });

        /* Create a base container */
        const baseContainer = helpers.createDiv({ className: "ql-base-container" });

        document.body.onclick = (e) => {
            const baseContainer = document.querySelector(".ql-base-container");
            const target = e.target as Node;

            if (target.contains(baseContainer)) {
                destroyCodeEditor();
            }
        };

        /* Image container (top container) ref. */
        const codeContainer = helpers.createDiv({ className: "ql-code-container" });

        baseContainer.append(codeContainer);

        document.body.append(overlay);
        document.body.append(baseContainer);

        const codePreviewWrapper = helpers.createDiv({ className: "ql-code-preview-wrapper" });

        /* Create confirmation button */
        const saveButton = helpers.createButton({
            className: "ql-button-code-confirm",
            label: "Ok",
        });

        /* Create close button */
        const closeButton = helpers.createButton({
            className: "ql-button-close",
        });

        /* Create select with options */
        const selectButton = document.createElement("select");

        languages.forEach(l => {
            const option = document.createElement("option");
            option.value = l.name;
            option.innerText = l.name;
            selectButton.append(option);
        });

        selectButton.value = "javascript";

        const header = helpers.createDiv({ className: "ql-code-container-header" });
        header.append(selectButton);
        header.append(saveButton);

        codeContainer.append(header);
        codeContainer.append(closeButton);

        const aceEditorComponent = helpers.createDiv({ className: "ql-ace-editor" });

        aceEditorComponent.setAttribute("id", "ace-editor");

        codePreviewWrapper.append(aceEditorComponent);

        codeContainer.append(codePreviewWrapper);

        /* Load external code editor */
        const aceEditor = startAce(code, language);

        selectButton.value = language;

        selectButton.onchange = (ev) => {
            if (ev.target) {
                const target = ev.target as HTMLSelectElement;

                language = target.value;

                console.log("Changed language to: ", language);

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

            const l = code.length;

            if (editMode === "create") {
                quill.insertEmbed(index, "code-block", { code, language }, "api");
                //quill.setSelection({ index, length }, "api");
                destroyCodeEditor();
            } else if (editMode === "edit") {
                console.log("Edited!");

                const [leaf, offset] = quill.getLeaf(index);

                if (leaf) {
                    leaf.replaceWith("code-block", {
                        code,
                        language,
                    });
                    //quill.setSelection({ index, length }, "api");
                    
                    document.querySelectorAll("code").forEach(el => {
                        if (!el.dataset.highlighted) {
                            hljs.highlightElement(el);
                        }
                    });
                    
                    destroyCodeEditor();
                }
            }

        };

        closeButton.onclick = () => {
            destroyCodeEditor();
        }
    };

    const onSelectionChange = (range: Range, oldRange: Range, source: EmitterSource) => {

        const removeFloatingDiv = () => {
            const el = document.querySelector(".ql-code-floating-div");
            if (el) {
                el.remove();
            }
        };

        if (quill.isEnabled() && quill.hasFocus()) {

            removeFloatingDiv();

            if (range) {
                const { index, length } = range;
                const [leaf, offset] = quill.getLeaf(index);

                console.log(offset, length, leaf);

                if (leaf) {

                    const node = leaf.domNode as HTMLDivElement;

                    if (
                        node.nodeName.toLowerCase() === "div" &&
                        node.firstChild?.nodeName.toLowerCase() === "pre"
                    ) {
                        const code = node.textContent;
                        const language = node.getAttribute("language");

                        console.log(code, language);

                        if (code && language) {

                            /* Create "edit image" button */
                            const editButton = helpers.createButton({
                                className: "ql-button-edit-code",
                                label: "Edit Code",
                                onClick: () => {
                                    createCodeEditor(quill, "edit", code, language);
                                },
                            });

                            /* Create "remove image" button */
                            const removeButton = helpers.createButton({
                                className: "ql-button-remove-code",
                                label: "Remove Code",
                                onClick: () => {
                                    leaf.remove();
                                },
                            });

                            const bounds = quill.getBounds(index);

                            if (bounds) {
                                const floatingDiv = helpers.createDiv({
                                    className: "ql-code-floating-div",
                                    height: String(bounds.height) + "px"
                                });
                                document.querySelector(".ql-container")?.append(floatingDiv);
                                floatingDiv.style.top = String(bounds.top) + "px";
                                floatingDiv.style.left = "0px";
                                floatingDiv.append(editButton);
                                floatingDiv.append(removeButton);
                            }

                        }
                    } else {
                        removeFloatingDiv();
                    }
                } else {
                    removeFloatingDiv();
                }
            } else {
                removeFloatingDiv();
            }
        } else {
            removeFloatingDiv();
        }
    }

    quill.on("selection-change", onSelectionChange);

    return () => {
        console.log("We handle code blocks...");

        const codeContainer = document.querySelector("ql-code-container");
        if (!codeContainer) {
            createCodeEditor(quill, "create", "", "javascript");
        } else {
            destroyCodeEditor();
        }
    };
};