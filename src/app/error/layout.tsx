import type {  Metadata } from "next";

export const metadata: Metadata = {
    title: "Error",
    description: "Error page",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function Layout({children}:{children: React.ReactNode}) {
    return <>{ children }</>
}