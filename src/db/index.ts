"use server"

import { cache } from "react";
import { prisma } from "@/db/prisma";
import { PostData, PostUpdates, Tag } from "@/types";

export const createPost = async ({ data }: { data: PostData }) => {
    try {
        await prisma
            .post
            .create({ data });
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

/* Cached version... */
export const fetchPosts = cache(async ({ authorId }: { authorId: string }) => {
    /* Find all posts of user with authorId */
    const posts = await prisma
        .post
        .findMany({
            where: { authorId },
            orderBy: { createdAt: "desc" },
            include: { tags: true, author: true, _count: true },
        });
    await prisma.$disconnect();
    return posts;
});

export const fetchAllPosts = cache(async () => {
    /* Find all posts of all users */
    const posts = await prisma
        .post
        .findMany({
            orderBy: { createdAt: "desc" },
            include: { author: true, tags: true, _count: true }
        });
    await prisma.$disconnect();
    return posts;
});

/* Cached version... */
export const fetchPost = cache(async (slug: string) => {
    /* Find a post of given slug */
    const post = await prisma
        .post
        .findUnique({
            where: { slug },
            include: { _count: true, author: true, tags: true }
        });
    await prisma.$disconnect();
    return post;
});

export const updatePost = async ({ slug, data }: { slug: string, data: PostUpdates }) => {
    const updated = await prisma
        .post
        .update({
            where: { slug },
            data
        });
    await prisma.$disconnect();
    return updated;
};

export const deletePost = async ({ slug }: { slug: string }) => {
    const deleted = await prisma
        .post
        .delete({
            where: { slug }
        });
    await prisma.$disconnect();
    return deleted;
};

export const checkSlugIsUnique = async (slug: string) => {
    const results = await prisma
        .post
        .findFirst({
            where: { slug }
        });
    await prisma.$disconnect();
    return results;
};

/* User queries */
export const fetchUser = async ({ email }: { email: string | undefined }) => {
    /* Fetch user data */
    if (email) {
        const user = await prisma
            .user
            .findFirst({
                where: { email },
                include: {
                    posts: true,
                    tags: true,
                    accounts: true,
                    sessions: true,
                    _count: true,
                },
            });
        await prisma.$disconnect();
        return user;
    }
};


export const fetchUserId = async ({ email }: { email: string | undefined }) => {
    if (email) {
        const user = await prisma
            .user
            .findFirst({
                where: { email }
            });
        await prisma.$disconnect();
        return user?.id;
    }
};


export const fetchTags = async () => {
    const tags = await prisma.tag.findMany();
    await prisma.$disconnect();
    return tags;
};

export const createTag = async ({ data }: { data: { name: string } }) => {
    try {
        await prisma.tag.create({ data });
    } catch (err) {
        console.log(err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

export const updateTag = async ({ id, data }: { id: string, data: { name: string } }) => {
    const updated = await prisma.tag.update({
        where: { id },
        data
    });
    await prisma.$disconnect();
    return updated;
};