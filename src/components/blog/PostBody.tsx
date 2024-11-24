"use client";

import QuillContext from "@/quill/context/QuillContext";
import { Editor } from "@/quill/editor/Editor";

export const PostBody = ({ content }: { content: string }) => {
    return (
        <QuillContext
            options={{ theme: "bubble", readOnly: true }}
            initialDelta={content}
        >
            <Editor id="description-editor" />
        </QuillContext>
    );
};