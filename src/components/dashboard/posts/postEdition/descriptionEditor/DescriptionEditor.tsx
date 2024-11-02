"use client";

import React, { Dispatch, SetStateAction } from "react";

import dynamic from "next/dynamic";

const QuillContext = dynamic(
    () => import("@/quill/context/QuillContext"),
    { ssr: false },
);

const QuillDescriptionEditor = dynamic(
    () => import("./QuillDescriptionEditor").then(m => m.QuillDescriptionEditor),
    { ssr: false }
);

import { QuillOptions } from "@/quill/context/QuillContext";
import { QuillContents } from "@/types";
import { toolbarId } from "./QuillDescriptionEditor";

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
