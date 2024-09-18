import "@/quill/css/bubble.css";

import dynamic from "next/dynamic";
const QuillContext = dynamic(() => import("@/quill/context/QuillContext"), { ssr: false });
import { QuillOptions } from "quill";

import { ShowPost } from "@/components/dashboard/ShowPost";
import { appName } from "@/config";
import { fetch, fetchPost } from "@/db";

import { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await fetchPost(params.slug);

    return {
        title: `${appName} dashboard | ${post.title}`,
    }
}

export default async function Page({ params }: { params: { slug: string } }) {

    const post = await fetchPost(params.slug);

    const options: QuillOptions = {
        theme: "bubble",
        readOnly: true
    };

    return (
        <div className="show-page">
            <QuillContext options={options} initialContents={post.body}>
                <ShowPost post={post} />
            </QuillContext>
        </div>
    );
}

export async function generateStaticParams() {
    const posts = await fetch();

    return posts.map(post => {
        return { slug: post.slug };
    });
}