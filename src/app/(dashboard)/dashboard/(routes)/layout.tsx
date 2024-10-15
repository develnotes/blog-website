import { Locator } from "@/components/dashboard/Locator";

import { appName } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata =  {
    title: `${appName} dashboard | Home`
}


export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Locator />
            {children}
        </>
    );
}