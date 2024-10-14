import Inline from "quill/blots/inline";

class Quote extends Inline {

    static blotName: string = "quote";
    static tagName: string | string[] = "Q";
    static className: string = "ql-quote";

    static create() {
        return super.create();
    }

    static formats() {
        return true;
    }
};

export default Quote;