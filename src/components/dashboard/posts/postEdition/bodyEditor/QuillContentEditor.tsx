"use client";

import { useQuill } from "@/quill/context/QuillContext";
import * as actions from "@/actions";
import { useErrorMessages } from "@/contexts/ErrorMessagesContext";
import { ErrorMessage } from "../errorMessage";
import { Label } from "../label";
import { CheckedStatus } from "../checkedStatus";
import { Stats } from "../stats";
import { useCallback } from "react";
import dynamic from "next/dynamic";

export const toolbarId = "toolbar";

const Editor = dynamic(
    () => import("@/quill/editor/Editor").then(m => m.Editor),
    { ssr: false }
);

export const QuillContentEditor = () => {
    const { contents } = useQuill();
    const { messages, setMessages } = useErrorMessages();

    const onBlur = useCallback(() => {
        actions.checkBody(contents)
            .then(r => {
                setMessages({
                    ...messages,
                    bodyMessage: r.message,
                });
            });
    }, [contents, messages, setMessages]);

    return (
        <>
            <Label>
                Content
                <CheckedStatus condition={messages.bodyMessage === undefined} />
            </Label>
            <Toolbar />
            <Editor
                id="content-editor"
                onBlur={onBlur}
            />
            <ErrorMessage message={messages.bodyMessage} />
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
            <span className="ql-formats">
                <button className="ql-anchor"></button>
                <button className="ql-code-block"></button>
                <button className="ql-formula"></button>
                <button className="ql-image"></button>
                <button className="ql-blockquote"></button>
            </span>
            <span className="ql-formats">
                <select className="ql-align"></select>
                <button className="ql-indent" value="+1"></button>
                <button className="ql-indent" value="-1"></button>
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="bullet"></button>
                <button className="ql-list" value="ordered"></button>

            </span>
        </div>
    );
};