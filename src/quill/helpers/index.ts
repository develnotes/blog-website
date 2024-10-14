import interact from "interactjs";
import { Blot, Leaf } from "parchment";
import Quill, { Bounds } from "quill";


/* Create resize observer */
export const resizeObserver = new ResizeObserver(() => {
    const preview = document.querySelector(".ql-image-preview");
    const widthInput = document.querySelector(".ql-image-width-input") as HTMLInputElement;

    if (preview) {
        const dimensions = {
            width: preview.clientWidth,
            height: preview.clientHeight,
        }

        if (widthInput) {
            widthInput.value = String(dimensions.width);
        }
    }
});

export const setResizable = (el: HTMLElement) => {
    if (el) {
        interact(el)
            .resizable({
                edges: {
                    top: false,
                    left: false,
                    bottom: false,
                    right: true
                },
                listeners: {
                    move: function (event) {
                        let { x, y } = event.target.dataset

                        x = (parseFloat(x) || 0) + event.deltaRect.left
                        y = (parseFloat(y) || 0) + event.deltaRect.top

                        if (event.rect.width <= 750) {
                            Object.assign(event.target.style, {
                                width: `${event.rect.width}px`,
                                //height: `${event.rect.height}px`,
                                //transform: `translate(${x}px, ${y}px)`
                            })

                            Object.assign(event.target.dataset, { x, y })
                        }
                    }
                }
            })
    }
};

export const createElement = {

    "button": (props?: Omit<Partial<HTMLButtonElement>, "style"> & { style?: Partial<CSSStyleDeclaration> }) => {
        const element = document.createElement("button");
        props && Object.entries(props).forEach(prop => {
            const attribute = prop[0];
            const value = prop[1];
            (element as any)[attribute] = value;
        });
        if (props) {
            const styles = props.style;
            styles && Object.entries(styles).forEach(style => {
                const property = style[0];
                const value = style[1];
                (element.style as any)[property] = value;
            });
        }
        return element as HTMLButtonElement;
    },

    "input": (props?: Omit<Partial<HTMLInputElement>, "style"> & { style?: Partial<CSSStyleDeclaration> }) => {
        const element = document.createElement("input");
        props && Object.entries(props).forEach(prop => {
            const attribute = prop[0];
            const value = prop[1];
            (element as any)[attribute] = value;
        });
        if (props) {
            const styles = props.style;
            styles && Object.entries(styles).forEach(style => {
                const property = style[0];
                const value = style[1];
                (element.style as any)[property] = value;
            });
        }
        return element as HTMLInputElement;
    },

    "form": (props?: Omit<Partial<HTMLFormElement>, "style"> & { style?: Partial<CSSStyleDeclaration> }) => {
        const element = document.createElement("form");
        props && Object.entries(props).forEach(prop => {
            const attribute = prop[0];
            const value = prop[1];
            (element as any)[attribute] = value;
        });
        if (props) {
            const styles = props.style;
            styles && Object.entries(styles).forEach(style => {
                const property = style[0];
                const value = style[1];
                (element.style as any)[property] = value;
            });
        }
        return element as HTMLFormElement;
    },

    "select": (props?: Omit<Partial<HTMLSelectElement>, "style"> & { style?: Partial<CSSStyleDeclaration> }) => {
        const element = document.createElement("select");
        props && Object.entries(props).forEach(prop => {
            const attribute = prop[0];
            const value = prop[1];
            (element as any)[attribute] = value;
        });
        if (props) {
            const styles = props.style;
            styles && Object.entries(styles).forEach(style => {
                const property = style[0];
                const value = style[1];
                (element.style as any)[property] = value;
            });
        }
        return element as HTMLSelectElement;
    },

    "option": (props?: Omit<Partial<HTMLOptionElement>, "style"> & { style?: Partial<CSSStyleDeclaration> }) => {
        const element = document.createElement("option");
        props && Object.entries(props).forEach(prop => {
            const attribute = prop[0];
            const value = prop[1];
            (element as any)[attribute] = value;
        });
        if (props) {
            const styles = props.style;
            styles && Object.entries(styles).forEach(style => {
                const property = style[0];
                const value = style[1];
                (element.style as any)[property] = value;
            });
        }
        return element as HTMLOptionElement;
    },

    "div": (props?: Omit<Partial<HTMLDivElement>, "style"> & { style?: Partial<CSSStyleDeclaration> }) => {
        const element = document.createElement("div");
        props && Object.entries(props).forEach(prop => {
            const attribute = prop[0];
            const value = prop[1];
            (element as any)[attribute] = value;
        });
        if (props) {
            const styles = props.style;
            styles && Object.entries(styles).forEach(style => {
                const property = style[0];
                const value = style[1];
                (element.style as any)[property] = value;
            });
        }
        return element as HTMLDivElement;
    },

    "span": (props?: Omit<Partial<HTMLSpanElement>, "style"> & { style?: Partial<CSSStyleDeclaration> }) => {
        const element = document.createElement("span");
        props && Object.entries(props).forEach(prop => {
            const attribute = prop[0];
            const value = prop[1];
            (element as any)[attribute] = value;
        });
        if (props) {
            const styles = props.style;
            styles && Object.entries(styles).forEach(style => {
                const property = style[0];
                const value = style[1];
                (element.style as any)[property] = value;
            });
        }
        return element as HTMLSpanElement;
    },

    "label": (props?: Omit<Partial<HTMLLabelElement>, "style"> & { style?: Partial<CSSStyleDeclaration> }) => {
        const element = document.createElement("label");
        props && Object.entries(props).forEach(prop => {
            const attribute = prop[0];
            const value = prop[1];
            (element as any)[attribute] = value;
        });
        if (props) {
            const styles = props.style;
            styles && Object.entries(styles).forEach(style => {
                const property = style[0];
                const value = style[1];
                (element.style as any)[property] = value;
            });
        }
        return element as HTMLLabelElement;
    },

    "img": (props?: Omit<Partial<HTMLImageElement>, "style"> & { style?: Partial<CSSStyleDeclaration> }) => {
        const element = document.createElement("img");
        props && Object.entries(props).forEach(prop => {
            const attribute = prop[0];
            const value = prop[1];
            (element as any)[attribute] = value;
        });
        if (props) {
            const styles = props.style;
            styles && Object.entries(styles).forEach(style => {
                const property = style[0];
                const value = style[1];
                (element.style as any)[property] = value;
            });
        }
        return element as HTMLImageElement;
    }
};

export const queryElement = (selectors: string) => {
    return document.querySelector(selectors) as HTMLElement;
};

export const queryAllElements = (selectors: string) => {
    return document.querySelectorAll(selectors);
};

export const removeElement = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
        el.remove();
    }
};

document.body.addEventListener("click", (e) => {
    const baseContainer = queryElement(".ql-base-container");
    const target = e.target as Node;

    if (target.contains(baseContainer)) {
        destroyEditor();
    }
});

document.body.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
        destroyEditor();

    }
});

export const destroyEditor = () => {
    const overlay = queryElement(".ql-overlay");
    const baseCtn = queryElement(".ql-base-container");

    if (baseCtn) {
        baseCtn.remove();
    }

    if (overlay) {
        overlay.remove();
    }
};

class Helpers {

    autoCloseElements: string[] = [];

    constructor() {
        this.createListeners();
    }

    registerAutoCloseElements = (selectors: string[]) => {
        selectors.forEach(selector => {
            this.autoCloseElements.push(selector);
        });
    }

    getAutoCloseElements() {
        return this.autoCloseElements;
    }

    createListeners = () => {
        const onMouseDown = (ev: MouseEvent) => {
            this.autoCloseElements.forEach(selector => {
                const element = queryElement(selector);
                if (element) {
                    if (element.contains(ev.target as Node)) {
                        return null;
                    }
                    element.remove();
                }
            });
        };
        document.body.removeEventListener("mousedown", onMouseDown);
        document.body.addEventListener("mousedown", onMouseDown);

        const onResize = () => {
            this.autoCloseElements.forEach((selector) => {
                removeElement(selector);
            });
        };
        window.removeEventListener("resize", onResize);
        window.addEventListener("resize", onResize);
    }

    manageElementClick = (quill: Quill, selector: string, callback: (leaf: Leaf, index: number) => void) => {
        const onMouseDown = (ev: MouseEvent) => {
            queryAllElements(selector).forEach(el => {
                const element = el as HTMLElement;

                if (element.contains(ev.target as Node)) {
                    const index = quill.getIndex(Quill.find(element) as Blot);
                    const [leaf] = quill.getLeaf(index + 1);

                    if (leaf) {
                        const match = leaf.domNode == element;
                        if (match) {
                            callback(leaf, index);
                        }
                    }
                }
            });
        }
        document.body.addEventListener("mousedown", onMouseDown);
    }
}

export default Helpers;


/* export const createContainer = (elementName: string) => {
    const overlay = createElement.div({ className: "ql-overlay" });
    const baseContainer = createElement.div({ className: "ql-base-container" });
    const container = createElement.div({ className: `ql-${elementName}-container` });

    baseContainer.append(container);
    document.body.append(overlay, baseContainer);

    const saveButton = createElement.button({
        className: `ql-button-${elementName}-confirm`,
        textContent: "Save",
    });
    const closeButton = createElement.button({
        className: "ql-button-close",
    });

    return { container, saveButton, closeButton };
}; */

export const createContainerElements = (elementName: string) => {
    const saveButton = createElement.button({
        className: `ql-button-${elementName}-confirm`,
        textContent: "Save",
    });

    /* Create close button */
    const closeButton = createElement.button({
        className: "ql-button-close",
    });

    return { saveButton, closeButton };
};

export const createFloatingDivControls = (elementName: string) => {

    const editButton = createElement.button({
        className: `ql-button-edit-${elementName}`,
        textContent: "Edit",
    });

    const removeButton = createElement.button({
        className: `ql-button-remove-${elementName}`,
        textContent: "Remove",
    });

    const closeButton = createElement.button({
        className: "ql-button-close-floating-div",
    });

    const removeFloatingDiv = () => removeElement(`.ql-floating-div-${elementName}`);

    return { editButton, removeButton, closeButton, removeFloatingDiv };
};

export const createElementOverlay = (element: HTMLElement, elementName: string) => {

    const overlay = createElement.div({
        className: `ql-${elementName}-inline-overlay`,
        style: {
            position: "absolute",
            top: "0px",
            left: "0px",
            height: String(element.getBoundingClientRect().height) + "px",
            width: String(element.getBoundingClientRect().width) + "px",
            border: "1px solid blue",
            backgroundColor: "transparent",
            zIndex: "1",
        }
    }) as HTMLDivElement;

    /* This is a button above the overlay, to close overlay on click. */
    const closeButton = createElement.button({
        className: "ql-button-close-floating-div",
        onmousedown: (ev) => {
            ev.stopPropagation();
            removeElement(`.ql-floating-div-${elementName}`);
            removeElement(`.ql-${elementName}-inline-overlay`);
        },
    });

    removeElement(`.ql-${elementName}-inline-overlay`);

    if (!queryElement(`.ql-${elementName}-inline-overlay`)) {
        element.append(overlay);
        overlay.append(closeButton);
    }

    return { overlay, closeButton };
};

export const createFloatingDiv = (elementName: string, options: {
    elements: HTMLElement[],
    inline?: boolean,
    element?: HTMLElement,
    bounds?: Bounds,
    style?: Partial<CSSStyleDeclaration>,
}) => {

    const container = queryElement(".ql-container") as HTMLElement;

    const floatingDiv = createElement.div({
        className: `ql-floating-div-${elementName}`,
        style: {
            top: options.bounds ? String(options.bounds.top) + "px" : "auto",
            height: options.bounds ? String(options.bounds.height) + "px" : "auto",
            width: options.inline ? "auto" : "100%",
            left: "auto",
        },
    }) as HTMLDivElement;

    if (options.style) {
        Object.entries(options.style).forEach(entry => {
            const property = entry[0];
            const value = entry[1];
            (floatingDiv.style as any)[property] = value;
        });
    }

    if (options.inline) {
        if (!options.element || !options.bounds) {
            throw new Error("Inline position requires an element. The floating div will be positioned relative to this element.");
        }

        positionInlineFloatingDiv(options.element, options.bounds, floatingDiv);

        floatingDiv.classList.add(`ql-floating-div-${elementName}--inline`);
    }

    options.elements.forEach(element => {
        floatingDiv.append(element);
    });

    container.append(floatingDiv);

    return floatingDiv;
};

const positionInlineFloatingDiv = (element: HTMLElement, bounds: Bounds, floatingDiv: HTMLDivElement) => {
    const { left, right, bottom, top, height, width } = element.getBoundingClientRect();
    const floatingDivRect = floatingDiv.getBoundingClientRect();
    const editorRect = queryElement(".ql-editor").getBoundingClientRect();

    const computedLeft = (left - editorRect.left);

    console.log(computedLeft, floatingDivRect.left, editorRect.left, left);

    floatingDiv.style.left = computedLeft + "px";
    floatingDiv.style.top = String(bounds.bottom + 5) + "px";
};
