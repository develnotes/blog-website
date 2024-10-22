import { useCallback, useEffect, useRef } from "react";

export const useScroll = () => {

    const ref = useRef<HTMLUListElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const scrollLeft = useCallback(() => {
        const ctn = ref.current;

        if (ctn) {
            const w = ctn.getBoundingClientRect().width;
            const totalScroll = ctn.scrollWidth;
            const progress = ctn.scrollLeft / (totalScroll - w); /* range [0, 1] */

            if (progress > .05) {
                ctn.scrollBy({ behavior: "smooth", left: -w });
            } else {
                ctn.scrollTo({ left: totalScroll, behavior: "smooth" });
            }
        }
    }, []);

    const scrollRight = useCallback(() => {
        const ctn = ref.current;

        if (ctn) {
            const w = ctn.getBoundingClientRect().width;
            const totalScroll = ctn.scrollWidth;
            const progress = ctn.scrollLeft / (totalScroll - w); /* range [0, 1] */

            if (progress < .95) {
                ctn.scrollBy({ behavior: "smooth", left: w });
            } else {
                ctn.scrollTo({ behavior: "smooth", left: 0 });
            }
        }
    }, []);


    useEffect(() => {
        const ctn = ref.current;
        const indicator = indicatorRef.current;

        const setCardWidth = () => {
            ctn?.childNodes.forEach((child) => {
                const node = child as HTMLElement;
                node.style.minWidth = ctn.getBoundingClientRect().width + "px";
                node.scrollIntoView();
            });
        }

        window.addEventListener("resize", setCardWidth);

        setCardWidth();

        ctn?.childNodes.forEach(() => {
            const el = document.createElement("div");
            el.className = "scroll-indicator__step";
            indicator?.append(el);
        });

        const getScroll = () => {
            if (ctn) {
                const count = indicator?.childNodes.length;

                const w = ctn.getBoundingClientRect().width;
                const totalScroll = ctn.scrollWidth;
                const progress = ctn.scrollLeft / (totalScroll - w); /* range [0, 1] */

                indicator?.childNodes.forEach((el, index) => {
                    const step = el as HTMLDivElement;
                    step.classList.remove("active");

                    if (count) {
                        const range = 1 / count;

                        const condition =
                            progress >= range * index &&
                            progress <= range * (index + 1);

                        if (condition) {
                            step.classList.add("active");
                        }
                    }
                });
            }
        };

        getScroll();

        if (ctn) {
            ctn.addEventListener("scroll", getScroll);
        }

        return () => {
            if (ctn) {
                ctn.addEventListener("scroll", getScroll);
            }
            if (indicator) {
                indicator.innerHTML = "";
            }
            window.removeEventListener("resize", setCardWidth);
        }
    }, []);

    return {
        scrollLeft,
        scrollRight,
        ref,
        indicatorRef,
    };
};