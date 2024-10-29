"use client"

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import * as actions from "@/actions"

import { TitleInput } from "@/components/dashboard/TitleInput";
import { PostHeaderImageSelector } from "@/components/dashboard/imageSelector/PostHeaderImageSelector";

import { IconAlertCircle, IconAsterisk, IconCheck } from "@tabler/icons-react";
import type { Post, EditPostFormState } from "@/types";
import { ContentEditor } from "./ContentEditor";


export const PostEdit = ({ post }: { post: Post }) => {

    const initialFormState: EditPostFormState = {
        contentsMessage: "",
        imageMessage: "",
        errorMessage: "",
    }

    const [image, setImage] = useState<string>(post.image || "");
    const [title, setTitle] = useState<string>(post.title);
    const [contents, setContents] = useState<string>("");
    const [messages, setMessages] = useState<EditPostFormState>(initialFormState);
    const [edited, setEdited] = useState<boolean>(false);

    const updatePostAction = actions.updatePost.bind(null, initialFormState, {
        slug: post.slug,
        contents: contents,
        image,
    });

    const [state, action] = useFormState(updatePostAction, initialFormState);

    useEffect(() => {
        setMessages(state);
    }, [state]);

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
        if (contents === post.body && title === post.title && image === post.image) {
            setEdited(false);
        } else {
            setEdited(true);
        }
    }, [contents, post.body, title, post.title, image, post.image]);

    return (
        <div className="post-editor">
            <div className="post-editor__image">
                <div className="post-editor__label">
                    Image
                    {
                        image.length > 0 && image.startsWith("https") &&
                        <IconCheck size={20} color="green" />
                    }
                </div>
                <PostHeaderImageSelector image={image} setImage={setImage} />
                <div className="form-error-message">
                    {
                        (image.length === 0 || !image.startsWith("https")) &&
                        (
                            messages.imageMessage &&
                            <>
                                <IconAlertCircle size={20} />
                                <div>{messages.imageMessage}</div>
                            </>
                        )
                    }
                </div>
            </div>

            <div className="post-editor__title">
                <div className="post-editor__label">Title</div>
                <TitleInput title={title} setTitle={setTitle} editMode />
            </div>

            <div className="post-editor__body">
                <div className="post-editor__label">Content</div>
                <ContentEditor setContents={setContents} initialContents={post.body}  />
            </div>

            <div className="post-editor__footer">
                <form action={action} className="post-editor__form">
                    <SubmitButton />
                </form>
            </div>
        </div>
    );
};