import Inline from "quill/blots/inline";

class Highlight extends Inline {

    static blotName: string = "highlight";
    static tagName: string | string[] = "MARK";
    static className: string = "ql-highlighted";

    static creaste() {
        return super.create();
    }

    static formats() {
        return true;
    }
}

export default Highlight;