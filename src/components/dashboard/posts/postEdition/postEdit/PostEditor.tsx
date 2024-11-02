"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import * as actions from "@/actions"

import { IconAsterisk, IconCheck } from "@tabler/icons-react";

import { ImageEditor } from "../imageEditor";
import { TitleEditor } from "../titleEditor";
import { ErrorMessage } from "../errorMessage";

const BodyEditor = dynamic(
    () => import("../bodyEditor").then(m => m.BodyEditor),
    { ssr: false }
);

const DescriptionEditor = dynamic(
    () => import("../descriptionEditor").then(m => m.DescriptionEditor),
    { ssr: false }
);

import type { Post, QuillContents } from "@/types";
import { useErrorMessages } from "@/contexts/ErrorMessagesContext";
import dynamic from "next/dynamic";


export const PostEditor = ({ post }: { post: Post }) => {

    const [image, setImage] = useState<string>(post.image || "");
    const [title, setTitle] = useState<string>(post.title);
    const [description, setDescription] = useState<QuillContents>({ text: "", delta: post.description || "" });
    const [body, setBody] = useState<QuillContents>({ text: "", delta: post.body || "" });
    const [edited, setEdited] = useState<boolean>(false);

    const { messages, setMessages, initialFormState } = useErrorMessages();

    const updatePostAction = actions.updatePost.bind(null, initialFormState, {
        slug: post.slug,
        body,
        description,
        image,
    });

    const [state, action] = useFormState(updatePostAction, initialFormState);

    useEffect(() => {
        setMessages(state);
    }, [state, setMessages]);

    const SubmitButton = () => {
        const { pending } = useFormStatus();
        return (
            <button
                type="submit"
                disabled={pending || !edited}
                className="button button__submit">
                {
                    pending ?
                        "Saving..." :
                        <>
                            {
                                edited ?
                                    <span>Save <IconAsterisk size={12} /></span> :
                                    <span>Saved  <IconCheck size={12} /></span>}
                        </>
                }
            </button>
        );
    };

    useEffect(() => {
        if (body.delta === post.body && title === post.title && image === post.image) {
            setEdited(false);
        } else {
            setEdited(true);
        }
    }, [body.delta, post.body, title, post.title, image, post.image]);

    return (
        <div className="post-editor">
            <div className="post-editor__image">
                <ImageEditor image={image} setImage={setImage} />
            </div>

            <div className="post-editor__title">
                <TitleEditor title={title} setTitle={setTitle} editMode />
            </div>

            <div className="post-editor__description">
                <DescriptionEditor initialDelta={post.description as string} setContents={setDescription} />
            </div>

            <div className="post-editor__body">
                <BodyEditor initialDelta={post.body} setContents={setBody} />
            </div>

            <ErrorMessage message={messages.errorMessage} />

            <div className="post-editor__footer">
                <form action={action} className="post-editor__form">
                    <SubmitButton />
                </form>
            </div>
        </div>
    );
};