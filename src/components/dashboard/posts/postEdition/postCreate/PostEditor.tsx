import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import * as actions from '@/actions';

import { QuillContents } from "@/types";
import { useErrorMessages } from "@/contexts/ErrorMessagesContext";

import { ImageEditor } from "../imageEditor";
import { TitleEditor } from "../titleEditor";
import { ErrorMessage } from "../errorMessage";
import { DescriptionEditor } from "../descriptionEditor";
import { BodyEditor } from "../bodyEditor";
import { TagsEditor } from "../tagsEditor";
import { useTags } from "@/components/dashboard/tags";

export const PostEditor = ({ authorId }: { authorId: string }) => {

    const [image, setImage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<QuillContents>({ delta: "", text: "" });
    const [body, setBody] = useState<QuillContents>({ delta: "", text: "" });
    const { tags } = useTags();

    const { initialFormState, messages, setMessages } = useErrorMessages();

    const createPostAction = actions.createPost.bind(null, initialFormState, {
        image,
        title,
        description,
        body,
        tags,
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

            <div className="post-editor__tags">
                <TagsEditor />
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
};