"use client";

import QuillContext from "@/quill/context/QuillContext";
import { Editor } from "@/quill/editor/Editor";

export const PostCardDescription = ({ description }: { description: string }) => {

    return (
        <QuillContext
            options={{ theme: "bubble", readOnly: true }}
            initialDelta={description}
        >
            <Editor id="description-editor" />
        </QuillContext>
    );
};