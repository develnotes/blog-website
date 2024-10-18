"use client"

import { useEffect, useState } from "react";
import { Menu } from "./Menu";
import { IconMenu2, IconX } from "@tabler/icons-react";

export const HeaderMenuWidget = () => {

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
            <div className="header__menu-widget">
                <button
                    onClick={() => setShow(false)}
                    className="header__menu-widget__button header__menu-widget__button--close">
                    <IconX />
                </button>
                <Menu setShow={setShow} />
            </div>
        );
    } else {
        return (
            <button
                onClick={() => setShow(true)}
                className="header__menu-widget__button header__menu-widget__button--open">
                <IconMenu2 />
            </button>
        );
    }
};