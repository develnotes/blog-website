"use client"

import "@/quill/css/bubble.css";

import { Post } from "@prisma/client";
import Quill, { QuillOptions } from "quill";
import { useEffect, useRef } from "react";

export const ShowPost = ({ post }: { post: Post }) => {

    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill>();

    useEffect(() => {
        const currentEditorRef = editorRef.current;

        const options: QuillOptions = {
            readOnly: true,
            theme: "bubble",
        };

        if (!quillRef.current) {
            if (currentEditorRef) {
                quillRef.current = new Quill(currentEditorRef, options);
            }
        }

        if (quillRef.current) {
            quillRef.current.setContents(JSON.parse(post.body));
        }
    }, [post.body]);

    return (
        <div className="post">

            <div className="post__title">{post.title}</div>

            <div className="post__body">
                <div ref={editorRef}></div>
            </div>
        </div>
    );
};