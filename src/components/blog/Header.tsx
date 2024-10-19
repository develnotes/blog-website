import { paths } from "@/config";
import { appName } from "@/config";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="header">
            <div className="header__title">
                { appName }
            </div>
            <nav className="header__nav">
                <ul className="header__nav__menu">
                    <li className="header__nav__menu__item">
                        <Link className="header__nav__menu__item__link" href={paths.blog.home()}>
                            Home
                        </Link>
                    </li>
                    <li className="header__nav__menu__item">
                        <Link className="header__nav__menu__item__link" href={paths.blog.posts()}>
                            Posts
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}