"use client"

import "@/quill/css/snow.css";
import "@/quill/css/bubble.css";
import "@/quill/css/styles.css";

import Quill, { QuillOptions } from "quill";
import { useCallback, useEffect, useRef, useState } from "react";
import { create, Post } from "@/db";

export const CreatePost = ({
    readOnly=false,
    theme,
    placeholder
}: {
    readOnly?: boolean,
    theme: "snow" | "bubble",
    placeholder?: string
}) => {

    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill>();

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");

    useEffect(() => {
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ];

        const options: QuillOptions = {
            readOnly,
            theme,
            placeholder,
            modules: {
                toolbar: toolbarOptions
            }
        };

        const currentEditorRef = editorRef.current;

        if (!quillRef.current) {
            if (currentEditorRef) {
                quillRef.current = new Quill(currentEditorRef, options);
            }
        }
    }, [theme, placeholder, readOnly]);

    useEffect(() => {
        if (quillRef.current) {
            quillRef.current.on("text-change", () => {
                const deltaString = JSON.stringify(quillRef.current && quillRef.current.getContents());
                setBody(deltaString);
            });
        }
    }, []);

    const createPost = useCallback(() => {
        const data: Post = {
            body,
            slug: title.split(" ").join("-").toLowerCase(),
            title
        }

        console.log(data);

        create({data})
            .then(() => {
                console.log("Post created!");
            })
            .catch(err => console.log(err));
    }, [body, title]);

    return (
        <div className="create">
            <div className="create__title">
                <input
                    type="text"
                    name="title"
                    className="create__title__input"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className="create__body">
                <div ref={editorRef}></div>
            </div>
            <button className="button create__button create__button--create" onClick={createPost}>Create Post</button>
        </div>
    );
};