"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { IconMoon, IconSun } from "@tabler/icons-react";

export const HeaderThemeWidget = () => {

    const { theme, setTheme } = useTheme();

    return (
        <div className="header__theme-widget">
            <button className="icon-button header__theme-widget__button"
                onClick={() => {
                    theme === "dark" ? setTheme("light") : setTheme("dark")
                }}>
                {
                    theme === "dark" ? <IconSun /> : <IconMoon />
                }
            </button>
        </div>
    );
};