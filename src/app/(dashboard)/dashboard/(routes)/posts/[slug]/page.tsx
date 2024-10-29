"use server";

import { PostShow } from "@/components/dashboard/posts";
import * as db from "@/db";
import { auth } from "@/auth";
import { getUserData } from "@/data";


export default async function Page({ params }: { params: { slug: string } }) {

    const post = await db.fetchPost(params.slug);
    const session = await auth();
    const data = await getUserData(session);

    if (data) {
        const posts = data.posts || [post];

        return (
            <div className="show-page">
                <noscript>
                    <div className="no-script-message">
                        You must activate Javascript to visualiize the post
                    </div>
                </noscript>
                <PostShow post={post} posts={posts} />
            </div>
        );
    }
}

export async function generateStaticParams() {

    const posts = await db.fetchAllPosts();

    return posts.map(post => {
        return { slug: post.slug };
    });
}