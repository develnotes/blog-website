"use client"

import { Editor } from "@/quill/editor/Editor";
import { useQuill } from "@/quill/context/QuillContext";

import { useState } from "react";

import { Post } from "@prisma/client";
import { SelectPostImage } from "./SelectPostImage";
import * as actions from "@/actions"
import { TitleInput } from "./TitleInput";
import { useFormState, useFormStatus } from "react-dom";

export const EditPost = ({ post }: { post: Post }) => {

    const [image, setImage] = useState<string>(post.image || "");
    const [title, setTitle] = useState<string>(post.title);
    const quill = useQuill();

    const initialFormState: actions.FormState = {
        contentsMessage: "",
        imageMessage: "",
        titleMessage: "",
        errorMessage: "",
    }

    const updatePostAction = actions.updatePost.bind(null, initialFormState, { slug: post.slug, contents: quill.contents, image, title });

    const [state, action] = useFormState(updatePostAction, initialFormState);

    const SubmitButton = () => {

        const { pending } = useFormStatus();

        return (
            <button
                disabled={pending}
                className="button button__submit">
                {pending ? "Saving..." : "Save"}
            </button>
        );
    };

    return (
        <div className="edit">
            <div className="edit__image">
                <div className="edit__label">Image</div>
                <SelectPostImage image={image} setImage={setImage} />
            </div>

            <div className="edit__title">
                <div className="edit__label">Title</div>
                <TitleInput title={title} setTitle={setTitle} />
            </div>

            <div className="edit__label">Content</div>
            <div className="edit__body">
                <Editor />
            </div>

            <div className="edit__footer">
                <form action={action} className="edit__form">
                    <SubmitButton />
                </form>
            </div>
        </div>
    );
};