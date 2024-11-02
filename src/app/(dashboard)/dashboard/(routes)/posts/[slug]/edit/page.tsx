"use server";

import { PostEdit } from "@/components/dashboard/posts";
import { fetchAllPosts, fetchPost } from "@/db";

export default async function Page({ params }: { params: { slug: string } }) {

    const post = await fetchPost(params.slug);

    if (post) {
        return (
            <div className="edit-page">
                <noscript>
                    <div className="no-script-message">
                        The editor needs Javascript to work. Please activate Javascript in the Browser.
                    </div>
                </noscript>
                <PostEdit post={post} />
            </div>
        );
    }
}

export async function generateStaticParams() {

    const posts = await fetchAllPosts();

    return posts.map(post => {
        return { slug: post.slug };
    });
}