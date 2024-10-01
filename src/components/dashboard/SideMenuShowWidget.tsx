"use client"

import { useEffect, useState } from "react";
import { Menu } from "./SideMenu";
import { IconMenu2, IconX } from "@tabler/icons-react";

export const SideMenuShowWidget = () => {

    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const onResize = () => {
            setShow(false);
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

    if (show) {
        return (
            <div className="header__show-side-menu">
                <button
                    onClick={() => setShow(false)}
                    className="header__show-side-menu__button header__show-side-menu__button--close">
                    <IconX />
                </button>
                <Menu setShow={setShow} />
            </div>
        );
    } else {
        return (
            <button
                onClick={() => setShow(true)}
                className="header__show-side-menu__button header__show-side-menu__button--open">
                <IconMenu2 />
            </button>
        );
    }
};