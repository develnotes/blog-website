"use client"

import { useState } from "react";
import { useQuill } from "@/quill/context/QuillContext";
import { Editor } from "@/quill/editor/Editor";
import * as actions from '@/actions';
import { SelectPostImage } from "./SelectPostImage";
import { TitleInput } from "./TitleInput";
import { useFormState, useFormStatus } from "react-dom";
import { FormState } from "@/types";


export const CreatePost = ({ authorId }: { authorId: string }) => {

    const [image, setImage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const quill = useQuill();

    const initialFormState: FormState = {
        contentsMessage: "",
        imageMessage: "",
        titleMessage: "",
        errorMessage: "",
    }

    const createPostAction = actions.createPost.bind(null, initialFormState, {
        contents: quill.contents,
        image,
        title,
        html: quill.htmlContent,
    }, authorId);

    const [state, action] = useFormState(createPostAction, initialFormState);

    const ButtonSubmit = () => {
        const { pending } = useFormStatus();
        return (
            <button
                type="submit"
                disabled={pending}
                className="button button__submit">
                {pending ? "Creating" : "Create"} Post {pending && "..."}
            </button>
        );
    }

    return (
        <div className="create">
            <div className="create__image">
                <div className="create__label">Image</div>
                <SelectPostImage image={image} setImage={setImage} />
                {state && state.imageMessage && state.imageMessage}
            </div>

            <div className="create__title">
                <div className="create__label">Title</div>
                <TitleInput title={title} setTitle={setTitle} />
                {state && state.titleMessage && state.titleMessage}
            </div>

            <div className="create__label">Content</div>
            <div className="create__body">
                <Editor />
                {state && state.contentsMessage && state.contentsMessage}
            </div>

            {state && state.errorMessage && state.errorMessage}

            <div className="create__footer">
                <form className="create__form" action={action}>
                    <ButtonSubmit />
                </form>
            </div>
        </div>
    );
};
