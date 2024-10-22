"use server";

import * as db from "@/db";

export const getPosts = async (userId: string | undefined) => {

    if (userId) {
        const posts = await db.fetch(userId);

        return posts;
    }
};
