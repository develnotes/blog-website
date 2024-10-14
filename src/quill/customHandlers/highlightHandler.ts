import Quill from "quill";

import Highlight from "../customFormats/highlight";
Quill.register(Highlight);

export const handlerType = "highlight";
export const handler = (quill: Quill) => {

    return () => {
        const { index, length } = quill.getSelection(true);
        const format = quill.getFormat(index, length);
    
        if (format && !format.highlight) {
            quill.format("highlight", true, "user");
        } else {
            quill.removeFormat(index, length, "user");
        }
    };
}