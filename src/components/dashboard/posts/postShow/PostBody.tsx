import dynamic from "next/dynamic";
const QuillContext = dynamic(() => import("@/quill/context/QuillContext"), { ssr: false });
import { QuillOptions } from "@/quill/context/QuillContext";
import { Editor } from "@/quill/editor/Editor";

export const PostBody = ({
    initialDelta,
}: {
    initialDelta: string | undefined,
}) => {

    const options: QuillOptions = {
        theme: "bubble",
        readOnly: true
    };

    return (
        <QuillContext options={options} initialDelta={initialDelta}>
            <Editor id="editor-body" />
        </QuillContext >
    );
};
