"use server";

import { PostsList } from "@/components/dashboard/posts";
import { getPosts } from "@/data";


export default async function Posts() {

    const posts = await getPosts();

    if (posts && posts.length > 0) {
        return (
            <div className="posts-page">
                <PostsList posts={posts} />
            </div>
        );
    }

    return (
        <div className="posts-page">
            <div className="posts-page__empty">
                No posts yet
            </div>
        </div>
    );
}
