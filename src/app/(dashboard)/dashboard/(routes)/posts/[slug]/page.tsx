"use server";

import { PostShow } from "@/components/dashboard/posts";
import { fetchAllPosts } from "@/db";
import { getUserData } from "@/data";
import { Post, Tag } from "@/types";


export default async function Page({ params }: { params: { slug: string } }) {

    const { slug } = params;
    const data = await getUserData();
    const posts = data?.posts as (Post & { tags: Tag[] })[];

    return (
        <div className="show-page">
            <noscript>
                <div className="no-script-message">
                    You must activate Javascript to visualiize the post
                </div>
            </noscript>
            <PostShow data={{ slug, posts }} />
        </div>
    );
}

export async function generateStaticParams() {

    const posts = await fetchAllPosts();

    return posts.map(post => {
        return { slug: post.slug };
    });
}
