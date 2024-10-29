"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import * as actions from '@/actions';

import { TitleInput } from "@/components/dashboard/TitleInput";
import { PostHeaderImageSelector } from "@/components/dashboard/imageSelector/PostHeaderImageSelector";

import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { PostFormState } from "@/types";
import { ContentEditor } from "./ContentEditor";


export const PostCreate = ({ authorId }: { authorId: string }) => {

    const initialFormState: PostFormState = {
        contentsMessage: "",
        imageMessage: "",
        titleMessage: "",
        errorMessage: "",
    };

    const [image, setImage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [messages, setMessages] = useState<PostFormState>(initialFormState);
    const [contents, setContents] = useState<string>("");

    const createPostAction = actions.createPost.bind(null, initialFormState, {
        contents,
        image,
        title,
    }, authorId);

    const [state, action] = useFormState(createPostAction, initialFormState);

    useEffect(() => {
        setMessages(state);
    }, [state]);

    const onTitleBlur = useCallback(() => {
        actions.checkTitle(title)
            .then(r => {
                setMessages({
                    ...messages,
                    titleMessage: r.message
                });
            });
    }, [title, messages]);

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
                <div className="post-editor__label">
                    <div>Title</div>
                    {
                        messages.titleMessage === undefined &&
                        <IconCheck size={20} color="green" />
                    }
                </div>
                <TitleInput
                    title={title}
                    setTitle={setTitle}
                    onBlur={onTitleBlur}
                />
                <div className="form-error-message">
                    {
                        messages.titleMessage &&
                        <>
                            <IconAlertCircle size={20} />
                            <div>{messages.titleMessage}</div>
                        </>
                    }
                </div>
            </div>

            <div className="post-editor__description">
                <div className="post-editor__label">
                    <div>Post description, resume or exerpt</div>
                    {/* {
                        messages.titleMessage === undefined &&
                        <IconCheck size={20} color="green" />
                    } */}
                </div>
                <textarea></textarea>
            </div>

            <div className="post-editor__body">
                <div className="post-editor__label">
                    Content
                </div>
                <ContentEditor setContents={setContents} />
                <div className="form-error-message">
                    {
                        messages.contentsMessage &&
                        <>
                            <IconAlertCircle size={20} />
                            <div>{messages.contentsMessage}</div>
                        </>
                    }
                </div>
            </div>

            {
                messages.errorMessage &&
                <div className="form-error-message">
                    <IconAlertCircle size={20} /> {messages.errorMessage}
                </div>
            }

            <div className="post-editor__footer">
                <form className="post-editor__form" action={action}>
                    <ButtonSubmit />
                </form>
            </div>
        </div>
    );
};
