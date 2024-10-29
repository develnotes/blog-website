import dynamic from "next/dynamic";
const QuillContext = dynamic(() => import("@/quill/context/QuillContext"), { ssr: false });
import { QuillOptions } from "@/quill/context/QuillContext";
import { QuillEditor } from "./QuillEditor";

export const ContentEditor = ({
    initialContents,
}: {
    initialContents: string | undefined,
}) => {

    const options: QuillOptions = {
        theme: "bubble",
        readOnly: true
    };

    return (
        <QuillContext options={options} initialContents={initialContents}>
            <QuillEditor />
        </QuillContext >
    );
};
