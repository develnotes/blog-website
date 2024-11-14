"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import * as actions from "@/actions"

import { IconAsterisk, IconCheck, IconWorldUp } from "@tabler/icons-react";

import { useErrorMessages } from "@/contexts/ErrorMessagesContext";
import { ErrorMessage } from "../errorMessage";

import type { Post, QuillContents } from "@/types";

import dynamic from "next/dynamic";
import { useTags } from "@/components/dashboard/tags";

const ImageEditor = dynamic(
    () => import("../imageEditor").then(m => m.ImageEditor),
    { ssr: false }
);

const TitleEditor = dynamic(
    () => import("../titleEditor").then(m => m.TitleEditor),
    { ssr: false }
);

const TagsEditor = dynamic(
    () => import("../tagsEditor").then(m => m.TagsEditor),
    { ssr: false }
);

const BodyEditor = dynamic(
    () => import("../bodyEditor").then(m => m.BodyEditor),
    { ssr: false }
);

const DescriptionEditor = dynamic(
    () => import("../descriptionEditor").then(m => m.DescriptionEditor),
    { ssr: false }
);


export const PostEditor = ({ post }: { post: Post }) => {

    const [image, setImage] = useState<string>(post.image || "");
    const [title, setTitle] = useState<string>(post.title);
    const [description, setDescription] = useState<QuillContents>({ text: "", delta: post.description || "" });
    const [body, setBody] = useState<QuillContents>({ text: "", delta: post.body || "" });
    const [edited, setEdited] = useState<boolean>(false);
    const { tags } = useTags();

    const { messages, setMessages, initialFormState } = useErrorMessages();

    const updatePostAction = actions.updatePost.bind(null, initialFormState, {
        slug: post.slug,
        body,
        description,
        image,
        tags,
    });

    const [state, action] = useFormState(updatePostAction, initialFormState);

    const publishPostAction = actions.publishPost.bind(null, initialFormState, {
        slug: post.slug,
    });

    const [publishState, publishAction] = useFormState(publishPostAction, initialFormState);

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

    const PublishButton = () => {
        const { pending } = useFormStatus();
        return (
            <button
                type="submit"
                disabled={pending || edited}
                className="button button__publish">
                {
                    pending ?
                        "Publishing..." :
                        <>
                            <IconWorldUp size={12} />
                            Publish
                        </>
                }
            </button>
        );
    }

    useEffect(() => {
        if (
            JSON.stringify(body.delta) === JSON.stringify(post.body) &&
            JSON.stringify(description.delta) === JSON.stringify(post.description) as string &&
            JSON.stringify(title) === JSON.stringify(post.title) &&
            JSON.stringify(image) === JSON.stringify(post.image) &&
            JSON.stringify(tags.map(tag => tag.id)) === JSON.stringify(post.tagIds)
        ) {
            setEdited(false);
        } else {
            setEdited(true);
        }
    }, [body.delta, post.body, description.delta, post.description, title, post.title, image, post.image, post.tagIds, tags]);

    return (
        <div className="post-editor">
            <div className="post-editor__image">
                <ImageEditor image={image} setImage={setImage} />
            </div>

            <div className="post-editor__title">
                <TitleEditor title={title} setTitle={setTitle} editMode />
            </div>

            <div className="post-editor__tags">
                <TagsEditor />
            </div>

            <div className="post-editor__description">
                <DescriptionEditor initialDelta={post.description as string} setContents={setDescription} />
            </div>

            <div className="post-editor__body">
                <BodyEditor initialDelta={post.body} setContents={setBody} />
            </div>

            <div className="post-editor__publish-status">

            </div>

            <ErrorMessage message={messages.errorMessage} />

            <div className="post-editor__footer">
                <form action={action} className="post-editor__form">
                    <SubmitButton />
                </form>

                <form action={publishAction}>
                    {
                        post.published ?
                            (
                                <span>Status: Published</span>
                            )
                            :
                            <PublishButton />
                    }
                </form>
            </div>
        </div>
    );
};