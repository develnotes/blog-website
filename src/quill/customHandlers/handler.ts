import { Blot, Leaf } from "parchment";
import Quill from "quill";
import Helpers, * as helpers from "@/quill/helpers";


class BlockHandler {

    format: string | undefined;
    elementName: string | undefined;
    index: number;
    length: number;
    autoCloseElements: string[];
    container: HTMLDivElement;

    constructor() {
        this.format = undefined;
        this.elementName = undefined;
        this.index = 0;
        this.length = 0;
        this.autoCloseElements = [];
        this.container = document.createElement("div");
        this.handler = this.handler.bind(this); /* https://www.linkedin.com/pulse/using-bind-method-constructor-javascript-jackson-muiru */
        this.createEditor = this.createEditor.bind(this);
        this.createControls = this.createControls.bind(this);
        this.createContainer = this.createContainer.bind(this);
    }

    createEditor(quill: Quill, mode: "create" | "edit", leaf?: Leaf) {
        if (leaf) {
            this.index = quill.getIndex(Quill.find(leaf?.domNode as HTMLElement) as Blot);
        } else {
            const range = quill.getSelection(true);
            this.index = range.index;
            this.length = range.length;
        }

        this.createContainer(this.elementName as string);
    }

    createControls({ index, quill, leaf }: { index: number, quill: Quill, leaf: Leaf }) { }

    createContainer = (elementName: string) => {
        const overlay = document.createElement("div");
        overlay.className = "ql-overlay";

        const baseContainer = document.createElement("div");
        baseContainer.className = "ql-base-container";

        if (this.container) {
            this.container.remove();
        }

        this.container = document.createElement("div");
        this.container.className = `ql-${elementName}-container`;

        baseContainer.append(this.container);
        document.body.append(overlay, baseContainer);
    }

    destroyContainer() {
        const overlay = document.querySelector(".ql-overlay");
        const baseCtn = document.querySelector(".ql-base-container");

        if (baseCtn) {
            baseCtn.remove();
        }

        if (overlay) {
            overlay.remove();
        }
    }

    registerAutoCloseElements(selectors: string[]) {
        selectors.forEach(selector => {
            this.autoCloseElements.push(selector);
        });
    }

    handler(quill: Quill) {

        const h = new Helpers();

        h.registerAutoCloseElements([`.ql-floating-div-${this.elementName}`, ...this.autoCloseElements]);

        h.manageElementClick(quill, `.ql-${this.elementName}-block-container`, (leaf, index) => {
            this.createControls({
                index: index + 1,
                quill,
                leaf,
            });
        });

        return () => {
            const container = document.querySelector(`ql-${this.elementName}-container`);

            if (!container) {
                this.createEditor(quill, "create", undefined);
            } else {
                helpers.destroyEditor();
            }
        };
    }
}

export default BlockHandler;