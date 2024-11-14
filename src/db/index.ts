"use server"

import { cache } from "react";
import { prisma } from "@/db/prisma";
import { PostData, PostUpdates, Tag } from "@/types";

export const createPost = async ({ data }: { data: PostData }) => {
    try {
        const createdPost = await prisma
            .post
            .create({ data });

        await prisma.$disconnect();
        return createdPost;
    } catch (e) {
        console.error(e);
        process.exit(1);
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

export const publishPost = async ({ slug }: { slug: string }) => {
    const published = await prisma
        .post
        .update({
            where: { slug },
            data: {
                published: true,
                publishedAt: new Date(Date.now())
            }
        });
        await prisma.$disconnect();
        return published;
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
                    posts: {
                        include: {
                            tags: true
                        }
                    },
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

export const fetchPostTagIds = async ({
    postId,
    slug,
}: {
    postId?: string,
    slug?: string,
}) => {
    const post = await prisma.post.findFirst({
        where: { id: postId, slug },
        include: { tags: true },
    });
    await prisma.$disconnect();
    return post?.tagIds;
};

export const fetchPostsByTagName = async ({
    tagName
}: {
    tagName: string
}) => {
    const tag = await prisma.tag.findFirst({
        where: { name: tagName },
        include: {
            posts: {
                include: {
                    author: true,
                    tags: true,
                    _count: true,
                },
            },
        },
    });

    return tag?.posts;
};

export const addPostIdToTags = async ({
    postId,
    tagIds
}: {
    postId: string,
    tagIds: string[]
}) => {
    await prisma.tag.updateMany({
        where: { id: { in: tagIds } },
        data: { postIds: { push: postId } }
    });
    await prisma.$disconnect();
};

export const addPostIdToTag = async ({
    postId,
    tagId,
}: {
    postId: string,
    tagId: string
}) => {
    await prisma.tag.update({
        where: { id: tagId },
        data: { postIds: { push: postId } }
    });
    await prisma.$disconnect();
};

export const removePostIdFromTag = async ({
    postId,
    tagId,
}: {
    postId: string,
    tagId: string,
}) => {
    const postIds = (
        await prisma.tag.findFirst({ where: { id: tagId } })
    )?.postIds;

    const updatedPostIds = postIds?.filter(id => id !== postId);

    await prisma.tag.update({
        where: { id: tagId },
        data: { postIds: { set: updatedPostIds } },
    })
};

export const addUserIdToTags = async ({
    userId,
    tagIds
}: {
    userId: string,
    tagIds: string[]
}) => {
    await prisma.tag.updateMany({
        where: { id: { in: tagIds } },
        data: { userIds: { push: userId } }
    });
    await prisma.$disconnect();
};

export const addUserIdToTag = async ({
    userId,
    tagId,
}: {
    userId: string,
    tagId: string
}) => {
    await prisma.tag.update({
        where: { id: tagId },
        data: { userIds: { push: userId } }
    });
    await prisma.$disconnect();
};

export const createTag = async ({ data }: { data: { name: string } }) => {
    try {
        const tag = await prisma.tag.create({ data });
        await prisma.$disconnect();
        return tag;
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export const updateTag = async ({ id, data }: { id: string, data: { name: string } }) => {
    const updated = await prisma.tag.update({
        where: { id },
        data,
    });
    await prisma.$disconnect();
    return updated;
};