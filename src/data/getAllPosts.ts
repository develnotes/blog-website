"use server";

import * as db from "@/db";

export const getAllPosts = async () => {
    const posts = await db.fetchAllPosts();
    return posts;
};
