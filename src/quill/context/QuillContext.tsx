"use client";

import "@/quill/styles/index.scss";

import {
    createContext,
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState

} from "react";

/* Quill */
import Quill, { QuillOptions } from "quill";

import "../config";

/* Import handlers */
import * as handlers from "@/quill/customHandlers";

import * as helpers from "@/quill/helpers";

import Toolbar from "quill/modules/toolbar";
import { renderKatex } from "../katex";
import hljs from "highlight.js";
import { QuillContents } from "@/types";

export { Quill };
export type { QuillOptions };
export type { ToolbarConfig } from "quill/modules/toolbar";

type ContextType = {
    editorRef: MutableRefObject<HTMLDivElement | null>,
    contents: { delta: string, text: string },
    stats: { words: number, characters: number },
    loading: boolean,
};

const defaultValue: ContextType = {
    editorRef: { current: null },
    contents: { delta: "", text: "" },
    stats: { words: 0, characters: 0 },
    loading: true,
};

const Context = createContext<ContextType>(defaultValue);

export default function QuillContext({
    options,
    initialDelta,
    setContents,
    children,
}: {
    options: QuillOptions,
    initialDelta?: string,
    setContents?: Dispatch<SetStateAction<QuillContents>>,
    children: React.ReactNode,
}) {

    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill>();
    const mountRef = useRef<boolean>(false);

    const [delta, setDelta] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [words, setWords] = useState<number>(0);
    const [characters, setCharacters] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const InitQuill = useCallback((editor: HTMLDivElement) => {

        quillRef.current = new Quill(editor, {
            ...options,
            modules: {
                ...options.modules
            }
        });

        console.log("Loaded Quill...");

        const quill = quillRef.current;

        const setDeltaString = (quill: Quill) => {
            const textString = JSON.stringify(quill.getText());
            setText(textString);

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
            setDelta(deltaString);

            if (setContents) {
                setContents({
                    delta: JSON.stringify(quill.getContents()),
                    text: JSON.stringify(quill.getText()),
                });
            }
        };

        if (quill) {
            initialDelta && quill.setContents(JSON.parse(initialDelta));

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

    }, [initialDelta, options, setContents]);

    useEffect(() => {
        mountRef.current = true;

        if (mountRef.current) {

            if (editorRef) {

                const editor = editorRef.current;

                if (!quillRef.current) {
                    console.log("Init...");

                    if (editor) {
                        InitQuill(editor);
                    }
                }
            }
        }

        return () => {
            mountRef.current = false;
        }
    }, [options, initialDelta, editorRef, setContents, InitQuill]);

    return (
        <Context.Provider value={{
            editorRef,
            contents: { delta, text },
            stats: { characters, words },
            loading,
        }}>
            {children}
        </Context.Provider>
    );
};


export const useQuill = () => useContext(Context);

