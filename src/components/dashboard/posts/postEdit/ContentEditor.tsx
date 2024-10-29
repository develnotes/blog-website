import dynamic from "next/dynamic";
const QuillContext = dynamic(() => import("@/quill/context/QuillContext"), { ssr: false });
import { QuillOptions } from "@/quill/context/QuillContext";
import { Dispatch, SetStateAction } from "react";
import { QuillEditor } from "./QuillEditor";

export const ContentEditor = ({
    setContents,
    initialContents,
}: {
    setContents: Dispatch<SetStateAction<string>>,
    initialContents: string | undefined,
}) => {

    const options: QuillOptions = {
        theme: "snow",
        modules: {
            toolbar: "#toolbar"//toolbarOptions
        }
    };

    return (
        <QuillContext options={options} initialContents={initialContents}>
            <QuillEditor setContents={setContents} />
        </QuillContext >
    );
};
