/* Import QuillContext dynamically */
import dynamic from "next/dynamic";
const QuillContext = dynamic(() => import("@/quill/context/QuillContext"), { ssr: false });

/* Import Quill types re-exported from QuillContext  */
import type { QuillOptions } from "@/quill/context/QuillContext";

import { PostShow } from "@/components/dashboard/PostShow";
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
            <noscript>
                <div className="no-script-message">
                    You must activate Javascript to visualiize the post
                </div>
            </noscript>
            <QuillContext options={options} initialContents={post.body}>
                <PostShow post={post} />
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