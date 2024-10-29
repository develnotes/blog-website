"use client";

import dynamic from "next/dynamic";
const QuillContext = dynamic(() => import("@/quill/context/QuillContext"), { ssr: false });
import { QuillOptions } from "@/quill/context/QuillContext";
import { Dispatch, SetStateAction } from "react";
import { QuillEditor } from "./QuillEditor";

export const ContentEditor = ({
    setContents,
}: {
    setContents: Dispatch<SetStateAction<string>>,
}) => {

    const options: QuillOptions = {
        theme: "snow",
        modules: {
            toolbar: "#toolbar"//toolbarOptions
        }
    };

    return (
        <QuillContext options={options}>
            <QuillEditor setContents={setContents}/>
        </QuillContext >
    );
};
