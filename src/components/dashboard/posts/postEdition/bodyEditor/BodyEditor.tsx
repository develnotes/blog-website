"use client";

import React, { Dispatch, SetStateAction } from "react";

import dynamic from "next/dynamic";

const QuillContext = dynamic(
    () => import("@/quill/context/QuillContext"),
    { ssr: false },
);

const QuillContentEditor = dynamic(
    () => import("./QuillContentEditor").then(m => m.QuillContentEditor),
    { ssr: false }
);

import { QuillOptions } from "@/quill/context/QuillContext";
import { QuillContents } from "@/types";
import { toolbarId } from "./QuillContentEditor";

export const BodyEditor = ({
    setContents,
    initialDelta,
}: {
    setContents: Dispatch<SetStateAction<QuillContents>>,
    initialDelta?: string,
}) => {

    const options: QuillOptions = {
        theme: "snow",
        placeholder: "Content",
        modules: {
            toolbar: "#" + toolbarId,
        },
    };

    return (
        <QuillContext options={options} setContents={setContents} initialDelta={initialDelta}>
            <QuillContentEditor />
        </QuillContext >
    );
};
