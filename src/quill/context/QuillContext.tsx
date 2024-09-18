"use client"

import "highlight.js/styles/stackoverflow-dark.min.css";
import "@/quill/css/styles.css";

import { createContext, RefObject, useContext, useEffect, useRef, useState } from "react";

/* Highlight JS for code module */
import hljs from "highlight.js";

/* Quill */
import Quill, { QuillOptions } from "quill";

/* Import and register blots */
import ImageBlot from "../customModules/ImageBlot";
Quill.register(ImageBlot);

/* Import handlers */
import { imageHandler } from "../customHandlers/imageHandler";

import Toolbar from "quill/modules/toolbar";

export { Quill };
export type { QuillOptions };
export type { ToolbarConfig } from "quill/modules/toolbar";

type ContextType = {
    editorRef: RefObject<HTMLDivElement> | null,
    contents: string,
    loading: boolean,
};

const defaultValue: ContextType = {
    editorRef: null,
    contents: "",
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
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("Init...")

        const editor = editorRef.current;

        if (!quillRef.current) {
            if (editor) {
                quillRef.current = new Quill(editor, {
                    ...options,
                    modules: { ...options.modules, syntax: { hljs } }
                });
                console.log("Loaded Quill...");
            }
        }
    }, [options]);

    useEffect(() => {
        console.log("setting quill");

        const quill = quillRef.current;

        const setDeltaString = (quill: Quill) => {
            const deltaString = JSON.stringify(quill.getContents());
            setContents(deltaString);
        };

        if (quill) {
            const toolbar = quill.getModule("toolbar") as Toolbar;
            toolbar.addHandler("image", imageHandler(quill));

            if (initialContents) {
                quill.setContents(JSON.parse(initialContents));
            }

            quill.on("text-change", () => setDeltaString(quill));

            setLoading(false);
        }

        return () => {
            if (quill) {
                quill.off("text-change", () => setDeltaString(quill));
            }
        }
    }, [initialContents]);

    return (
        <Context.Provider value={{
            editorRef,
            contents,
            loading,
        }}>
            {children}
        </Context.Provider>
    );
};


export const useQuill = () => useContext(Context);

