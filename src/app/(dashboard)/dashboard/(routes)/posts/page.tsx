"use server";

import { PostsList } from "@/components/dashboard/posts";
import { getPosts } from "@/data";


export default async function Posts() {

    const posts = await getPosts();

    if (posts) {
        return (
            <div className="posts-page">
                <PostsList posts={posts} />
            </div>
        );
    }

    return (
        <div className="posts-page">
            {"No posts yet"}
        </div>
    );
}
