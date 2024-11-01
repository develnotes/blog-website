"use client";

import { Dispatch, SetStateAction, useCallback } from "react";

import dynamic from "next/dynamic";

const QuillContext = dynamic(
    () => import("@/quill/context/QuillContext"),
    { ssr: false },
);

import { QuillOptions } from "@/quill/context/QuillContext";
import { useQuill } from "@/quill/context/QuillContext";
import { Editor } from "@/quill/editor/Editor";
import { QuillContents } from "@/types";
import { useErrorMessages } from "@/contexts/ErrorMessagesContext";
import * as actions from "@/actions";
import { CheckedStatus } from "../checkedStatus";
import { Label } from "../label";
import { ErrorMessage } from "../errorMessage";
import { Stats } from "../stats";

const toolbarId = "description-toolbar";
const editorId = "description-editor";

export const DescriptionEditor = ({
    setContents,
    initialDelta,
}: {
    setContents: Dispatch<SetStateAction<QuillContents>>,
    initialDelta?: string,
}) => {

    const options: QuillOptions = {
        theme: "snow",
        placeholder: "Description",
        modules: {
            toolbar: "#" + toolbarId,
        },
    };

    return (
        <QuillContext options={options} setContents={setContents} initialDelta={initialDelta}>
            <QuillDescriptionEditor />
        </QuillContext >
    );
};

const QuillDescriptionEditor = () => {

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
