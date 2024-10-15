"use client"

import "@/quill/styles/index.scss";

import { createContext, RefObject, useContext, useEffect, useRef, useState } from "react";

/* Quill */
import Quill, { QuillOptions } from "quill";

import "../config";

/* Import handlers */
import * as handlers from "@/quill/customHandlers";

import * as helpers from "@/quill/helpers";

import Toolbar from "quill/modules/toolbar";
import { renderKatex } from "../katex";
import hljs from "highlight.js";

export { Quill };
export type { QuillOptions };
export type { ToolbarConfig } from "quill/modules/toolbar";

type ContextType = {
    editorRef: RefObject<HTMLDivElement> | null,
    contents: string,
    htmlContent: string,
    textContent: string,
    words: number,
    characters: number,
    loading: boolean,
};

const defaultValue: ContextType = {
    editorRef: null,
    contents: "",
    htmlContent: "",
    textContent: "",
    words: 0,
    characters: 0,
    loading: true,
};

const Context = createContext<ContextType>(defaultValue);

export default function QuillContext({
    options,
    initialContents,
    children,
}: {
    options: QuillOptions,
    initialContents?: string,
    children: React.ReactNode,
}) {

    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill>();

    const [contents, setContents] = useState<string>("");
    const [htmlContent, setHTMLContent] = useState<string>("");
    const [textContent, setTextContent] = useState<string>("");
    const [words, setWords] = useState<number>(0);
    const [characters, setCharacters] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {

        const editor = editorRef.current;

        if (!quillRef.current) {
            console.log("Init...");

            if (editor) {
                quillRef.current = new Quill(editor, {
                    ...options,
                    modules: {
                        ...options.modules
                    }
                });

                console.log("Loaded Quill...");

                const quill = quillRef.current;

                const setDeltaString = (quill: Quill) => {
                    const htmlString = JSON.stringify(quill.getSemanticHTML());
                    setHTMLContent(htmlString);

                    const textString = JSON.stringify(quill.getText());
                    setTextContent(textString);

                    const words = textString
                        .replaceAll('"', "")
                        .replaceAll("\\n", "")
                        .split(" ")
                        .filter(w => w.length > 0)
                        .length;

                    setWords(words)

                    const characters = textString
                        .replaceAll('"', "")
                        .replaceAll("\\n", "")
                        .split(" ")
                        .join("").length;

                    setCharacters(characters);

                    const deltaString = JSON.stringify(quill.getContents());
                    setContents(deltaString);
                };

                if (quill) {
                    initialContents && quill.setContents(JSON.parse(initialContents));

                    quill.on("editor-change", renderKatex);
                    renderKatex();

                    helpers.queryAllElements("code").forEach(el => hljs.highlightElement(el as HTMLElement));

                    if (quill.isEnabled()) {
                        const toolbar = quill.getModule("toolbar") as Toolbar;

                        Object.values(handlers).forEach(({ handler, handlerType }) => {
                            toolbar.addHandler(handlerType, handler(quill));
                        });

                        quill.on("text-change", () => setDeltaString(quill));

                        setDeltaString(quill);
                    }

                    setLoading(false);
                }

                return () => {
                    quill && quill.off("text-change", () => setDeltaString(quill));
                }
            }
        }
    }, [options, initialContents]);

    return (
        <Context.Provider value={{
            editorRef,
            contents,
            htmlContent,
            textContent,
            words,
            characters,
            loading,
        }}>
            {children}
        </Context.Provider>
    );
};


export const useQuill = () => useContext(Context);

