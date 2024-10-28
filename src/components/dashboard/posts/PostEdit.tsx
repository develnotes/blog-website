"use client"

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Editor } from "@/quill/editor/Editor";
import { useQuill } from "@/quill/context/QuillContext";
import { Toolbar } from "@/quill/toolbar/Toolbar";

import * as actions from "@/actions"

import { TitleInput } from "@/components/dashboard/TitleInput";
import { PostHeaderImageSelector } from "@/components/dashboard/imageSelector/PostHeaderImageSelector";

import { IconAlertCircle, IconAsterisk, IconCheck } from "@tabler/icons-react";
import type { Post, EditPostFormState } from "@/types";


export const PostEdit = ({ post }: { post: Post }) => {

    const initialFormState: EditPostFormState = {
        contentsMessage: "",
        imageMessage: "",
        errorMessage: "",
    }

    const [image, setImage] = useState<string>(post.image || "");
    const [title, setTitle] = useState<string>(post.title);
    const [messages, setMessages] = useState<EditPostFormState>(initialFormState);
    const [edited, setEdited] = useState<boolean>(false);
    const quill = useQuill();

    const updatePostAction = actions.updatePost.bind(null, initialFormState, {
        slug: post.slug,
        contents: quill.contents,
        image,
        html: quill.htmlContent
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
        if (quill.contents === post.body && title === post.title && image === post.image) {
            setEdited(false);
        } else {
            setEdited(true);
        }
    }, [quill.contents, post.body, title, post.title, image, post.image]);

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
                <Toolbar />
                <Editor />
                <div>
                    {
                        /* Insert contents statistics (number of words) */
                        `words: ${quill.words}; 
                        characters: ${quill.characters}`
                    }
                </div>
            </div>

            <div className="post-editor__footer">
                <form action={action} className="post-editor__form">
                    <SubmitButton />
                </form>
            </div>
        </div>
    );
};