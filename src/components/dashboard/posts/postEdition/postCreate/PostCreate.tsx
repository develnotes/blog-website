"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import * as actions from '@/actions';

import { PostFormState, QuillContents } from "@/types";

import { ImageEditor } from "../imageEditor";
import { TitleEditor } from "../titleEditor";
import { BodyEditor } from "../bodyEditor";
import { DescriptionEditor } from "../descriptionEditor";
import { ErrorMessage } from "../errorMessage";

import ErrorMessagesContext, { useErrorMessages } from "@/contexts/ErrorMessagesContext";


export const PostCreate = ({ authorId }: { authorId: string }) => {

    const initialFormState: PostFormState = {
        imageMessage: "",
        titleMessage: "",
        descriptionMessage: "",
        bodyMessage: "",
        errorMessage: "",
    };

    return (
        <ErrorMessagesContext initialFormState={initialFormState}>
            <CreatePostComponent authorId={authorId} />
        </ErrorMessagesContext>
    );
};


const CreatePostComponent = ({ authorId }: { authorId: string }) => {

    const [image, setImage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<QuillContents>({ delta: "", text: "" });
    const [body, setBody] = useState<QuillContents>({ delta: "", text: "" });

    const { initialFormState, messages, setMessages } = useErrorMessages();

    const createPostAction = actions.createPost.bind(null, initialFormState, {
        image,
        title,
        description,
        body,
    }, authorId);

    const [state, action] = useFormState(createPostAction, initialFormState);

    useEffect(() => {
        setMessages(state);
    }, [state, setMessages]);

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
    };

    return (
        <div className="post-editor">
            <div className="post-editor__image">
                <ImageEditor image={image} setImage={setImage} />
            </div>

            <div className="post-editor__title">
                <TitleEditor title={title} setTitle={setTitle} />
            </div>

            <div className="post-editor__description">
                <DescriptionEditor setContents={setDescription} />
            </div>

            <div className="post-editor__body">
                <BodyEditor setContents={setBody} />
            </div>

            <ErrorMessage message={messages.errorMessage} />

            <div className="post-editor__footer">
                <form className="post-editor__form" action={action}>
                    <ButtonSubmit />
                </form>
            </div>
        </div>
    );
}