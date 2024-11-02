"use client";

import React from "react";
import QuillContext, { QuillOptions } from "@/quill/context/QuillContext";
import { Editor } from "@/quill/editor/Editor";

export const PostDescription = ({ initialDelta }: { initialDelta: string | undefined }) => {
    const options: QuillOptions = {
        theme: "bubble",
        readOnly: true
    };

    return (
        <QuillContext options={options} initialDelta={initialDelta}>
            <Editor id="editor-dscription" />
        </QuillContext >
    );
};
