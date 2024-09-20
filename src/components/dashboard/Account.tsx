"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { logout } from "@/actions/auth";
import { User } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/app/paths";
import { useSelectedLayoutSegments } from "next/navigation";

export const HeaderWidget = ({ user }: { user: User }) => {

    const { accountRef, showDetails, toggleVisibility, closeOnClick } = useHeaderWidget();

    const image = user.image as string;

    return (
        <div ref={accountRef} className="header-widget">

            <div className="header-widget__user-avatar"
                onClick={toggleVisibility}>
                <Image
                    src={image}
                    alt="User avatar"
                    fill
                    sizes="38"
                />
            </div>

            <Details show={showDetails}>
                <div className="header-widget__details">
                    <div className="header-widget__details__email">
                        {user.email}
                    </div>

                    <Link className="header-widget__details__link"
                        onClick={closeOnClick}
                        href={paths.dashboard.account()}>
                        <div className="header-widget__details__link__text">
                            Account
                        </div>
                    </Link>

                    <form action={logout}>
                        <button className="header-widget__details__button"
                            type="submit">
                            Logout
                        </button>
                    </form>
                </div>
            </Details>
        </div>
    );
};

const useHeaderWidget = () => {

    const accountRef = useRef<HTMLDivElement>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const segments = useSelectedLayoutSegments();
    const [currentSegment, setCurrentSegment] = useState<string>();

    /* Close account details on click outside, page scroll and window resize */
    useEffect(() => {
        const onClickBody = (ev: MouseEvent) => {
            const container = accountRef.current;

            if (container && container.contains(ev.target as Node)) {
                return null;
            }

            setShowDetails(false);
        }

        const onScrollBody = () => setShowDetails(false);

        const onResizeBody = () => setShowDetails(false);

        document.body.addEventListener("click", onClickBody);
        document.addEventListener("scroll", onScrollBody);
        window.addEventListener("resize", onResizeBody);

        return () => {
            document.body.removeEventListener("click", onClickBody);
            document.removeEventListener("scroll", onScrollBody);
            window.removeEventListener("resize", onResizeBody);
        }
    }, []);

    /* Close account details after navigating */
    useEffect(() => {
        if (currentSegment !== segments.toString()) {
            setShowDetails(false);
            setCurrentSegment(segments.toString());
        }
    }, [segments, currentSegment]);

    const toggleVisibility = useCallback(() => {
        showDetails ?
            setShowDetails(false) :
            setShowDetails(true);
    }, [showDetails]);

    const closeOnClick = useCallback(() => {
        setShowDetails(false);
    }, []);

    return {
        accountRef,
        showDetails,
        setShowDetails,
        closeOnClick,
        toggleVisibility,
    };
};

const Details = ({ children, show }: { children: React.ReactNode, show: boolean }) => {

    if (!show) return null;

    return <>{children}</>;
};

export const Account = ({ user }: { user: User }) => {

    const image = user.image as string;

    return (
        <div className="account">

            <div className="account__avatar">
                <Image
                    src={image}
                    alt="User avatar"
                    fill
                    sizes="300"
                    priority
                    fetchPriority="high"
                />
            </div>

            <div className="account__details">

                <div className="account__details__name">
                    {user.name}
                </div>

                <div className="account__details__email">
                    {user.email}
                </div>
            </div>

            <div className="account__logout">
                <form className="account__logout__form" action={logout}>
                    <button className="account__logout__button" type="submit">Logout</button>
                </form>
            </div>
        </div>
    );
};