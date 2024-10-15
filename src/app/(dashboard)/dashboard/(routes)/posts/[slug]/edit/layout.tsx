import { appName } from "@/config";
import { fetchPost } from "@/db";
import { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await fetchPost(params.slug);

    return {
        title: `${appName} dashboard | Edit ${post.title}`,
    };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
    return <>{ children }</>;
}