"use client"

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { paths } from "@/config";
import { AppLogo } from "./AppLogo";
import { MenuIcon, menuItems } from "@/config";

interface Menu { show?: boolean, setShow?: React.Dispatch<React.SetStateAction<boolean>> }

export const Menu = ({ show, setShow }: Menu) => {

    const segments = useSelectedLayoutSegments();

    const path = "/" + segments.slice(1).join("/");

    return (
        <>
            <div className="menu__header">
                <AppLogo />
            </div>
            <nav className="menu__nav">
                <ul className="menu__nav__list">

                    {
                        menuItems.map(item => {
                            return (
                                <MenuItem
                                    key={item.id}
                                    item={item}
                                    path={path}
                                    setShow={setShow}
                                />
                            );
                        })
                    }

                    <li className="menu__nav__list__item">
                        <Link
                            className="menu__nav__list__item__link"
                            href={paths.blog.home()}
                            onClick={() => setShow && setShow(false)}>
                            Blog
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};


type Item = {
    path: string,
    href: string,
    Icon: MenuIcon,
    label: string,
};

export const MenuItem = ({
    path,
    item,
    setShow
}: {
    path: string,
    item: Item,
    setShow: React.Dispatch<React.SetStateAction<boolean>> | undefined,
}) => {
    return (
        <li className={path === item.path ?
            "menu__nav__list__item menu__nav__list__item--active" :
            "menu__nav__list__item"}>
            <Link
                className="menu__nav__list__item__link"
                href={item.href}
                onClick={() => setShow && setShow(false)}>
                <item.Icon />
                <div className="menu__nav__list__item__link__text">
                    {item.label}
                </div>
            </Link>
        </li>
    );
};
