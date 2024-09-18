import interact from "interactjs";

type InputProps = {
    type?: string,
    placeholder?: string,
    name?: string,
    id?: string,
    className?: string
}

type InputLabelProps = {
    for: string,
    text: string,
}

type DivProps = {
    className: string,
    width?: string,
    height?: string,
}

type ImgPreviewProps = {
    className: string,
    src: string,
}

type IconProps = {}

type ButtonProps = {
    className?: string,
    label?: string,
    onClick?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null,
}

type FormatsProps = {
    className: string,
    children: HTMLElement,
}

export const createInput = (props: InputProps) => {
    const input = document.createElement("input");
    props.type && input.setAttribute("type", props.type);
    props.placeholder && input.setAttribute("placeholder", props.placeholder);
    props.name && input.setAttribute("name", props.name);
    props.id && input.setAttribute("id", props.id);
    props.className && input.classList.add(props.className);
    return input as HTMLInputElement;
};

export const createInputLabel = (props: InputLabelProps) => {
    const label = document.createElement("label");
    label.setAttribute("for", props.for);
    const text = document.createTextNode(props.text);
    label.append(text);
    return label;
};

export const createDiv = (props: DivProps) => {
    const el = document.createElement("div");
    el.classList.add(props.className);
    if (props.width) {
        el.style.width = props.width;
    }
    if (props.height) {
        el.style.height = props.height;
    }
    return el;
};

/* Create resize observer */
export const resizeObserver = new ResizeObserver(() => {
    const preview = document.querySelector(".ql-image-preview");
    const widthInput = document.querySelector(".ql-image-width-input") as HTMLInputElement;

    if (preview) {
        const dimensions = {
            width: preview.clientWidth,
            height: preview.clientHeight,
        }
        console.log(dimensions);

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

export const createImagePreview = (props: ImgPreviewProps) => {
    const img = document.createElement("img");
    img.classList.add(props.className);
    img.setAttribute("src", props.src);
    return img;
};

export const createButton = (props: ButtonProps) => {
    const btn = document.createElement("button");
    props.className && btn.classList.add(props.className);
    if (props.label) {
        const label = document.createTextNode(props.label);
        btn.append(label);
    }
    if (props.onClick) {
        btn.onclick = props.onClick;
    }
    return btn;
};

export const createFormats = (props: FormatsProps) => {
    const formats = document.createElement("span");
    formats.classList.add("ql-formats");
    formats.classList.add(props.className);
    formats.append(props.children);
    return formats;
};