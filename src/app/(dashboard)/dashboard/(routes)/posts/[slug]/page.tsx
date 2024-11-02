"use server";

import { PostShow } from "@/components/dashboard/posts";
import { fetchAllPosts } from "@/db";
import { getUserData } from "@/data";
import { Posts } from "@/types";


export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getUserData();

    return (
        <div className="show-page">
            <noscript>
                <div className="no-script-message">
                    You must activate Javascript to visualiize the post
                </div>
            </noscript>
            <PostShow data={{ slug: params.slug, posts: data?.posts as Posts }} />
        </div>
    );
}

export async function generateStaticParams() {

    const posts = await fetchAllPosts();

    return posts.map(post => {
        return { slug: post.slug };
    });
}