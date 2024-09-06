import Link from "next/link";

export const Header = () => {
    return (
        <header className="header">
            <div className="header__title">
                Blog Dashboard
            </div>
            <nav className="header__nav">
                <ul className="header__nav__menu">
                    <li className="header__nav__menu__item">
                        <Link className="header__nav__menu__item__link" href={"/dashboard"}>
                            Home
                        </Link>
                    </li>
                    <li className="header__nav__menu__item">
                        <Link className="header__nav__menu__item__link" href={"/dashboard/write"}>
                            Write
                        </Link>
                    </li>
                    <li className="header__nav__menu__item">
                        <Link className="header__nav__menu__item__link" href={"/dashboard/posts"}>
                            Posts
                        </Link>
                    </li>
                    <li className="header__nav__menu__item">
                        <Link className="header__nav__menu__item__link" href={"/"}>
                            Blog
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}