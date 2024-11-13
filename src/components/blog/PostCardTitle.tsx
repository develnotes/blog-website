import { useEffect, useRef } from "react";

export const PostCardTitle = ({ title }: { title: string }) => {

    const { spanRef, wrapperRef } = useTitleLength({ title });

    return (
        <div className="postcard-title">
            <h2 className="postcard-title__heading" ref={wrapperRef}>

                <span className="postcard-title__text postcard-title__text--hidden" ref={spanRef}>
                    {title}
                </span>

            </h2>
        </div>
    );
};

const useTitleLength = ({ title }: { title: string }) => {

    const isMounted = useRef(false);
    const currentTitle = useRef<string[]>([]);
    const wrapperRef = useRef<HTMLHeadingElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        isMounted.current = true;

        const currentWrapper = wrapperRef.current as Element;

        const setInnerText = (el: HTMLSpanElement, text: string) => {
            if (!el) return;
            el.innerHTML = "";
            const textValue = document.createTextNode(text);
            el.appendChild(textValue);
        };

        const getLength = (el: HTMLElement) => {
            return el.getBoundingClientRect().width;
        };

        const cropTitle = () => {
            const words = title.split(" ");
            let croppedTitle = "";
            let isSmaller = true;

            const outerElement = wrapperRef.current as HTMLHeadingElement;
            const innerElement = spanRef.current as HTMLSpanElement;

            if (!outerElement || !innerElement) return;

            const parentWidth = outerElement.getBoundingClientRect().width;

            innerElement.classList.remove("postcard-title__text--hidden");

            if (getLength(innerElement) < parentWidth) {
                return;
            }

            while (words.length > 0 && isSmaller) {
                currentTitle.current.unshift(croppedTitle);
                croppedTitle += words.shift() + " ";
                setInnerText(innerElement, croppedTitle);

                if (getLength(innerElement) > parentWidth) {
                    setInnerText(innerElement, currentTitle.current[0] + "...");
                    if (getLength(innerElement) > parentWidth) {
                        setInnerText(innerElement, currentTitle.current[1] + "...");
                    }
                    isSmaller = false;
                }
            }
        };

        const onResizeWrapper = () => {
            const innerElement = spanRef.current as HTMLSpanElement;
            setInnerText(innerElement, title);
            cropTitle();
        };

        const resizeObserver = new ResizeObserver(() => {
            onResizeWrapper();
        });

        if (isMounted.current) {
            cropTitle();
            resizeObserver.observe(currentWrapper);
        }

        return () => {
            isMounted.current = false;
            resizeObserver.unobserve(currentWrapper);
        }

    }, [title]);

    return {
        wrapperRef,
        spanRef,
    };
};