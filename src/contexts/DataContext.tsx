"use client";

import { createContext, useContext } from "react";

type ContextType = {};

const initialValue: ContextType = {};

const Context = createContext<ContextType>(initialValue);

export default function DataContext({ children }: { children: React.ReactNode }) {

    

    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider >
    );
}


export const useData = () => useContext<ContextType>(Context);
