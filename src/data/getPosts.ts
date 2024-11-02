"use server";

import { fetchPosts } from "@/db";
import { getUserId } from "./getUserId";

export const getPosts = async () => {

    const authorId = await getUserId();

    if (authorId) {
        const posts = await fetchPosts({ authorId });
        return posts;
    }
};
