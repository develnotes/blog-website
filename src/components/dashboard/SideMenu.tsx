"use client"

import { IconHome, IconNews, IconTextPlus, IconUserCheck } from "@tabler/icons-react";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { paths } from "@/app/paths";
import { AppLogo } from "./AppLogo";

export const SideMenu = () => {
    return (
        <div className="dashboard__side-menu">
            <div className="dashboard__side-menu__wrapper">
                <Menu />
            </div>
        </div>
    );
};

interface Menu { show?: boolean, setShow?: React.Dispatch<React.SetStateAction<boolean>> }

export const Menu = ({ show, setShow }: Menu) => {

    const segments = useSelectedLayoutSegments();

    const path = "/" + segments.slice(1).join("/");

    return (
        <>
            <div className="dashboard__side-menu__header">
                <AppLogo />
            </div>
            <nav className="dashboard__side-menu__nav">
                <ul className="dashboard__side-menu__nav__menu">
                    <li className={path === "/" ?
                        "dashboard__side-menu__nav__menu__item dashboard__side-menu__nav__menu__item--active" :
                        "dashboard__side-menu__nav__menu__item"}>
                        <Link 
                            className="dashboard__side-menu__nav__menu__item__link" 
                            href={paths.dashboard.home()} 
                            onClick={() => setShow && setShow(false)}>
                            <IconHome />
                            <div className="dashboard__side-menu__nav__menu__item__link__text">
                                Home
                            </div>
                        </Link>
                    </li>
                    <li className={path === "/write" ?
                        "dashboard__side-menu__nav__menu__item dashboard__side-menu__nav__menu__item--active" :
                        "dashboard__side-menu__nav__menu__item"}>
                        <Link 
                            className="dashboard__side-menu__nav__menu__item__link" 
                            href={paths.dashboard.write()}
                            onClick={() => setShow && setShow(false)}>
                            <IconTextPlus />
                            <div className={"dashboard__side-menu__nav__menu__item__link__text"}>
                                Write
                            </div>
                        </Link>
                    </li>
                    <li className={path === "/posts" ?
                        "dashboard__side-menu__nav__menu__item dashboard__side-menu__nav__menu__item--active" :
                        "dashboard__side-menu__nav__menu__item"}>
                        <Link 
                            className="dashboard__side-menu__nav__menu__item__link" 
                            href={paths.dashboard.posts()}
                            onClick={() => setShow && setShow(false)}>
                            <IconNews />
                            <div className="dashboard__side-menu__nav__menu__item__link__text">
                                Posts
                            </div>
                        </Link>
                    </li>
                    <li className={path === "/account" ?
                        "dashboard__side-menu__nav__menu__item dashboard__side-menu__nav__menu__item--active" :
                        "dashboard__side-menu__nav__menu__item"}>
                        <Link 
                            className="dashboard__side-menu__nav__menu__item__link" 
                            href={paths.dashboard.account()}
                            onClick={() => setShow && setShow(false)}>
                            <IconUserCheck />
                            <div className="dashboard__side-menu__nav__menu__item__link__text">
                                Account
                            </div>
                        </Link>
                    </li>
                    <li className="dashboard__side-menu__nav__menu__item">
                        <Link 
                            className="dashboard__side-menu__nav__menu__item__link" 
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