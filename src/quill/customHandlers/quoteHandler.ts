import Quill from "quill";

import Quote from "../customFormats/quote";
Quill.register(Quote);

export const handlerType  ="quote";
export const handler = (quill: Quill) => {

    return () => {
        const { index, length } = quill.getSelection(true);
        const format = quill.getFormat(index, length);
    
        if (format && !format.quote) {
            quill.format("quote", true, "user");
        } else {
            quill.removeFormat(index, length, "user");
        }
    }
};
