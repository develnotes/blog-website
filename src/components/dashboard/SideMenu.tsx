"use client"

import { IconHome, IconNews, IconTextPlus } from "@tabler/icons-react";

import { appLogo, appName } from "@/config";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export const SideMenu = () => {
    return (
        <div className="dashboard__side-menu">
            <div className="dashboard__side-menu__wrapper">
                <Menu />
            </div>
        </div>
    );
};

export const Menu = ({ show, setShow }: { show?: boolean, setShow?: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const segments = useSelectedLayoutSegments();

    const path = "/" + segments.slice(1).join("/");

    return (
        <>
            <div className="dashboard__title">
                <div className="dashboard__title--logo">{appLogo}</div>
                <div className="dashboard__title--main">{appName}</div>
                <div className="dashboard__title--sub">Dashboard</div>
            </div>
            <nav className="dashboard__side-menu__nav">
                <ul className="dashboard__side-menu__nav__menu">
                    <li className={path === "/" ?
                        "dashboard__side-menu__nav__menu__item dashboard__side-menu__nav__menu__item--active" :
                        "dashboard__side-menu__nav__menu__item"}>
                        <Link 
                            className="dashboard__side-menu__nav__menu__item__link" 
                            href={"/dashboard"} 
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
                            href={"/dashboard/write"}
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
                            href={"/dashboard/posts"}
                            onClick={() => setShow && setShow(false)}>
                            <IconNews />
                            <div className="dashboard__side-menu__nav__menu__item__link__text">
                                Posts
                            </div>
                        </Link>
                    </li>
                    <li className="dashboard__side-menu__nav__menu__item">
                        <Link 
                            className="dashboard__side-menu__nav__menu__item__link" 
                            href={"/"}
                            onClick={() => setShow && setShow(false)}>
                            Blog
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};