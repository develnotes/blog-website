"use server";

import { fetchAllPosts } from "@/db";

export const getAllPosts = async () => {
    const posts = await fetchAllPosts();
    return posts;
};
