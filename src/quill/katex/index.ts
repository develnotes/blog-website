import katex from "katex";
import { LatexDisplayMode } from "../customBlots/latex";

export const renderKatex = () => {
    document.querySelectorAll(".ql-latex-content").forEach(el => {
        const element = el as HTMLElement;
        const data = element.parentElement?.getAttribute("data-latex-formula");
        const displayMode = element.parentElement?.getAttribute("data-display-mode") as LatexDisplayMode;

        if (data) {
            try {
                katex.render(data, element, {
                    throwOnError: false,
                    displayMode: displayMode === "display" ? true : false,
                    output: "htmlAndMathml",
                });
            } catch (err) {
                if (err instanceof katex.ParseError) {
                    console.log(err);
                } else {
                    throw err;  // other error
                }
            }
        }
    });
};

