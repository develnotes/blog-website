"use server"

import { cache } from "react";

import { prisma, Post, User } from "@/db/prisma";

export type PostData = {
    title: string;
    body: string;
    slug: string;
    image: string;
    html: string;
    authorId: string;
}

export type PostUpdates = { 
    title: string, 
    body: string, 
    image: string, 
    html: string 
}

export type Posts = Post[];

export const create = async ({ data }: { data: PostData }) => {
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
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" } 
    });
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
    return post as Post;
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
    await prisma.$disconnect();
    return results;
};

/* User queries */
export const fetchUser = async (email: string) => {

    const user = await prisma.user.findFirst({
        where: { email }
    });
    await prisma.$disconnect();
    return user;
};