import { appName } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata =  {
    title: `${appName} dashboard | Account`
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{ children }</>;
}