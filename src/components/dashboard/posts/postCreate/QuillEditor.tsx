"use client";

import { useQuill } from "@/quill/context/QuillContext";
import { Editor } from "@/quill/editor/Editor";
import { Toolbar } from "@/quill/toolbar/Toolbar";
import { Dispatch, SetStateAction, useEffect } from "react";

export const QuillEditor = ({
    setContents,
}: {
    setContents: Dispatch<SetStateAction<string>>,
}) => {

    const quill = useQuill();

    useEffect(() => {
        setContents(quill.contents);
    }, [quill.contents, setContents]);

    return (
        <>
            <Toolbar />
            <Editor />
            <div>
                {
                    /* Insert contents statistics (number of words) */
                    `words: ${quill.stats.words};
                        characters: ${quill.stats.characters}`
                }
            </div>
        </>
    );
};