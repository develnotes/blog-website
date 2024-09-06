import Link from "next/link";

export const Header = () => {
    return (
        <header className="header">
            <div className="header__title">
                Blog Title
            </div>
            <nav className="header__nav">
                <ul className="header__nav__menu">
                    <li className="header__nav__menu__item">
                        <Link className="header__nav__menu__item__link" href={"/"}>
                            Home
                        </Link>
                    </li>
                    <li className="header__nav__menu__item">
                        <Link className="header__nav__menu__item__link" href={"/posts"}>
                            Posts
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}