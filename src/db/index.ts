"use server"

import { cache } from "react";
import { PrismaClient, Post as PostWithID } from "@prisma/client";

const prisma = new PrismaClient();

export type Post = {
    title: string;
    body: string;
    slug: string;
    image: string;
}

export type PostUpdates = { title: string, body: string, image: string }

export type Posts = PostWithID[];

export const create = async ({ data }: { data: Post }) => {

    try {
        await prisma.post.create({ data });
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

/* Cached version... */
export const fetch = cache(async () => {
    console.log("fetching data...");
    const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
    await prisma.$disconnect();
    return posts as Posts;
});

/* Cached version... */
export const fetchPost = cache(async (slug: string) => {

    console.log("fetchin post of slug " + slug);
    const post = await prisma.post.findUnique({
        where: { slug }
    });
    await prisma.$disconnect();
    return post as PostWithID;
});

export const update = async ({ slug, data }: { slug: string, data: PostUpdates }) => {

    const updated = await prisma.post.update({
        where: { slug },
        data
    });
    await prisma.$disconnect();
    return updated;
};

export const deletePost = async ({ slug }: { slug: string }) => {
    const deleted = await prisma.post.delete({
        where: { slug }
    });
    await prisma.$disconnect();
    return deleted;
};

export const checkSlugIsUnique = async (slug: string) => {
    const results = await prisma.post.findFirst({
        where: { slug }
    });

    return results;
};