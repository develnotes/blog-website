import { EmbedBlot } from "parchment";

class Code extends EmbedBlot {
    static blotName: string = "code-block";
    static tagName: string | string[] = "DIV";
    static className: string = "ql-code-block-container";

    static create(value: {
        code: string,
        language: string,
    }) {
        const node = super.create() as Element;
        node.setAttribute("spellcheck", "false");
        node.setAttribute("contenteditable", "false");
        node.setAttribute("data-language", value.language);
        node.setAttribute("data-code", value.code);
        const codeEl = document.createElement("code");
        codeEl.classList.add("ql-code-block", `language-${value.language}`)
        const textNode = document.createTextNode(value.code);
        const preEl = document.createElement("pre");
        node.append(preEl);
        preEl.append(codeEl);
        codeEl.append(textNode);
        return node;
    }

    static value(node: Element) {
        return {
            code: node.firstElementChild?.firstElementChild?.textContent,
            language: node.getAttribute("data-language"),
        }       
    }
}

export default Code;