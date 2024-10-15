import { appName } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `${appName} dashboard | Write`
}

export default async function Layout({children}: {children: React.ReactNode}) {

    return <>{ children }</>
}