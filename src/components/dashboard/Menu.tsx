"use client"

import { IconHome, IconNews, IconTextPlus, IconUserCheck } from "@tabler/icons-react";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { paths } from "@/app/paths";
import { AppLogo } from "./AppLogo";

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
                    <li className={path === "/" ?
                        "menu__nav__list__item menu__nav__list__item--active" :
                        "menu__nav__list__item"}>
                        <Link 
                            className="menu__nav__list__item__link" 
                            href={paths.dashboard.home()} 
                            onClick={() => setShow && setShow(false)}>
                            <IconHome />
                            <div className="menu__nav__list__item__link__text">
                                Home
                            </div>
                        </Link>
                    </li>
                    <li className={path === "/write" ?
                        "menu__nav__list__item menu__nav__list__item--active" :
                        "menu__nav__list__item"}>
                        <Link 
                            className="menu__nav__list__item__link" 
                            href={paths.dashboard.write()}
                            onClick={() => setShow && setShow(false)}>
                            <IconTextPlus />
                            <div className={"menu__nav__list__item__link__text"}>
                                Write
                            </div>
                        </Link>
                    </li>
                    <li className={path === "/posts" ?
                        "menu__nav__list__item menu__nav__list__item--active" :
                        "menu__nav__list__item"}>
                        <Link 
                            className="menu__nav__list__item__link" 
                            href={paths.dashboard.posts()}
                            onClick={() => setShow && setShow(false)}>
                            <IconNews />
                            <div className="menu__nav__list__item__link__text">
                                Posts
                            </div>
                        </Link>
                    </li>
                    <li className={path === "/account" ?
                        "menu__nav__list__item menu__nav__list__item--active" :
                        "menu__nav__list__item"}>
                        <Link 
                            className="menu__nav__list__item__link" 
                            href={paths.dashboard.account()}
                            onClick={() => setShow && setShow(false)}>
                            <IconUserCheck />
                            <div className="menu__nav__list__item__link__text">
                                Account
                            </div>
                        </Link>
                    </li>
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