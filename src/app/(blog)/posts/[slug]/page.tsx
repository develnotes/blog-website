"use server";

import { Post } from "@/components/blog/Post";
import { fetchPost } from "@/db";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {

    const post = await fetchPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <Post post={post} />
    );
}