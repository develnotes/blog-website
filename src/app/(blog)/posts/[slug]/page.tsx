"use server";

import { Post } from "@/components/blog/Post";
import { fetchPost } from "@/db";

export default async function Page({ params }: { params: { slug: string } }) {

    const post = await fetchPost(params.slug);

    if (post) {

        return (
            <Post post={post} />
        );
    }
}