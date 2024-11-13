"use client";

import "./go-to-top-button.scss";
import { useCallback, useEffect } from "react";
import { IconChevronsUp } from "@tabler/icons-react";

export const GoToTopButton = () => {

    useScrollToTop();

    const goToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <button className="go-to-top" onClick={goToTop}>
            <IconChevronsUp />
            Top
        </button>
    );
};


export const useScrollToTop = () => {
    useEffect(() => {
        const onScroll = (ev: Event) => {
            const el = ev.target as Document;
            const scrollTop = el.scrollingElement?.scrollTop as number;
                        
            if(scrollTop > 100) {
                document.querySelector(".go-to-top")?.classList.add("go-to-top--visible");
            } else {
                document.querySelector(".go-to-top")?.classList.remove("go-to-top--visible");
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);
};