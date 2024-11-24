import { paths } from "@/config";
import { headers } from "next/headers";
import Link from "next/link";

import type {  Metadata } from "next";

export const metadata: Metadata = {
    title: "404 | Not found",
    description: "404 Error page",
    icons: {
        icon: "/favicon.ico",
    },
};

export default async function NotFound() {

    const headersList = await headers()
    const domain = headersList.get('host')
    //const data = await getSiteData(domain)

    console.log(domain);

    return (
        <div className="not-found-page">
            <h1 className="not-found-page__title">Not Found</h1>
            <p className="not-found-page__message">The page you are looking for does not exist.</p>

            <Link href={paths.blog.home()} className="not-found-page__link">
                Go to home page
            </Link>
        </div>
    );
}