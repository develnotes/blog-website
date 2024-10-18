"use client";

import { createContext, useContext, useState } from "react";

type ContextType = {
    theme: "dark" | "light",
    setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>
};

const initialValue: ContextType = {
    theme: "light",
    setTheme: () => {},
};

const Context = createContext<ContextType>(initialValue);

export default function ThemeContext({ children }: { children: React.ReactNode }) {

    const [theme, setTheme] = useState<"dark" | "light">("light");

    return (
        <Context.Provider value={{ theme, setTheme }}>
            <div className={theme}>
                {children}
            </div>
        </Context.Provider >
    );
}

export const useTheme = () => useContext<ContextType>(Context);
