"use client";

import { useQuill } from "@/quill/context/QuillContext";
import { useErrorMessages } from "@/contexts/ErrorMessagesContext";
import * as actions from "@/actions";
import { CheckedStatus } from "../checkedStatus";
import { Label } from "../label";
import { ErrorMessage } from "../errorMessage";
import { Stats } from "../stats";
import { useCallback } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(
    () => import("@/quill/editor/Editor").then(m => m.Editor),
    { ssr: false }
);

export const toolbarId = "description-toolbar";
export const editorId = "description-editor";

export const QuillDescriptionEditor = () => {

    const { contents } = useQuill();
    const { messages, setMessages } = useErrorMessages();

    const onBlur = useCallback(() => {
        actions.checkDescription(contents)
            .then(r => {
                setMessages({
                    ...messages,
                    descriptionMessage: r.message,
                });
            });
    }, [contents, messages, setMessages]);

    return (
        <>
            <Label>
                Post description, resume or exerpt
                <CheckedStatus condition={messages.descriptionMessage === undefined} />
            </Label>
            <Toolbar />
            <Editor
                id={editorId}
                onBlur={onBlur}
            />
            <ErrorMessage message={messages.descriptionMessage} />
            <Stats />
        </>
    );
};


const Toolbar = () => {
    return (
        <div id={toolbarId}>
            <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
                <button className="ql-highlight"></button>
                <button className="ql-quote"></button>
            </span>
        </div>
    );
};
