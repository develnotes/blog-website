import { EmbedBlot } from "parchment";

export type LatexDisplayMode = "display" | "inline";

export type LatexBlotValue = {
    latexFormula: string,
    displayMode: LatexDisplayMode,
}

class Latex extends EmbedBlot {
    static blotName: string = "formula";
    static tagName: string | string[] = "DIV";
    static className: string = "ql-latex-block-container";

    static create(value: { 
        latexFormula: string, 
        displayMode: "display" | "inline",
    }): Node {
        const node = super.create() as Element;
        if (value.displayMode === "display") {
            node.classList.add("ql-latex-display");
        } else {
            node.classList.add("ql-latex-inline");
        }
        node.setAttribute("spellcheck", "false");
        node.setAttribute("contenteditable", "false");
        node.setAttribute("data-latex-formula", value.latexFormula);
        node.setAttribute("data-display-mode", value.displayMode);
        const el = document.createElement("div");
        el.className = "ql-latex-content";
        el.textContent = value.latexFormula;
        node.append(el);
        return node;
    }

    static value(node: Element) {
        return {
            latexFormula: node.getAttribute("data-latex-formula"),
            displayMode: node.getAttribute("data-display-mode"),
        }
    }
}

export default Latex;