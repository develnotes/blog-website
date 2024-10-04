import { EmbedBlot } from "parchment";


class CodeBlot extends EmbedBlot {
    static blotName: string = "code-block";
    static tagName: string | string[] = "DIV";

    static create(value: {
        code: string,
        language: string,
    }) {
        const node = super.create() as Element;
        node.classList.add("ql-code-block-container");
        node.setAttribute("spellcheck", "false");
        node.setAttribute("contenteditable", "false")
        const codeEl = document.createElement("code");
        codeEl.classList.add("ql-code-block");
        codeEl.classList.add(`language-${value.language}`)
        const textNode = document.createTextNode(value.code);
        const preEl = document.createElement("pre");
        node.append(preEl);
        preEl.append(codeEl);
        codeEl.append(textNode);
        node.setAttribute("language", value.language);
        return node;
    }

    static value(node: Element) {
        return {
            code: node.firstElementChild?.firstChild?.textContent,
            language: node.getAttribute("language"),
        }       
    }
}

export default CodeBlot;