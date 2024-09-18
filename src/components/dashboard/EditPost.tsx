"use client"

import { Editor } from "@/quill/editor/Editor";
import { useQuill } from "@/quill/context/QuillContext";

import { useEffect, useState } from "react";

import { Post } from "@prisma/client";
import { SelectPostImage } from "./SelectPostImage";
import * as actions from "@/actions"
import { TitleInput } from "./TitleInput";
import { useFormState, useFormStatus } from "react-dom";
import { IconAsterisk, IconCheck } from "@tabler/icons-react";

export const EditPost = ({ post }: { post: Post }) => {

    const [image, setImage] = useState<string>(post.image || "");
    const [title, setTitle] = useState<string>(post.title);
    const [edited, setEdited] = useState<boolean>(false);
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
                disabled={pending || !edited}
                className="button button__submit">
                {
                    pending ?
                        "Saving..." :
                        edited ? <span>Save <IconAsterisk size={12} /></span> : <span>Saved  <IconCheck size={12}/></span>
                }
            </button>
        );
    };

    useEffect(() => {

        console.log(`${title} - ${post.title}`);
        if (quill.contents === post.body && title === post.title && image === post.image) {
            console.log("Saved");
            setEdited(false);
        } else {
            console.log("Edited");
            setEdited(true);
        }
    }, [quill.contents, post.body, title, post.title, image, post.image]);

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