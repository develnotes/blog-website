"use server"

import { cache } from "react";
import { prisma } from "@/db/prisma";
import { PostData, PostUpdates } from "@/types";

export const createPost = async ({ data }: { data: PostData }) => {
    try {
        const createdPost = await prisma
            .post
            .create({ data });

        await prisma.$disconnect();
        return createdPost;
    } catch (e) {
        console.error(e);
        //process.exit(1);
    }

    return null;
};

/* Cached version... */
export const fetchPosts = cache(async ({ authorId }: { authorId: string }) => {
    /* Find all posts of user with authorId */
    try {
        const posts = await prisma
            .post
            .findMany({
                where: { authorId },
                orderBy: { createdAt: "desc" },
                include: { tags: true, author: true, _count: true },
            });
        await prisma.$disconnect();
        return posts;
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return [];
});

export const fetchAllPosts = cache(async () => {
    /* Find all posts of all users */
    try {
        const posts = await prisma
            .post
            .findMany({
                orderBy: { createdAt: "desc" },
                include: { author: true, tags: true, _count: true }
            });
        await prisma.$disconnect();
        return posts;
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return [];
});

/* Cached version... */
export const fetchPost = cache(async (slug: string) => {
    /* Find a post of given slug */
    try {
        const post = await prisma
            .post
            .findUnique({
                where: { slug },
                include: { _count: true, author: true, tags: true }
            });
        await prisma.$disconnect();
        return post;
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
});

export const updatePost = async ({ slug, data }: { slug: string, data: PostUpdates }) => {
    try {
        const updated = await prisma
            .post
            .update({
                where: { slug },
                data
            });
        await prisma.$disconnect();
        return updated;
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};

export const publishPost = async ({ slug }: { slug: string }) => {
    /* Publish a post */
    try {
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
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};

export const deletePost = async ({ slug }: { slug: string }) => {
    /* Delete a post */
    try {
        const deleted = await prisma
            .post
            .delete({
                where: { slug }
            });
        await prisma.$disconnect();
        return deleted;
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};

export const checkSlugIsUnique = async (slug: string) => {
    /* Check if slug is unique */
    try {
        const results = await prisma
            .post
            .findFirst({
                where: { slug }
            });
        await prisma.$disconnect();
        return results;
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};

/* User queries */
export const fetchUser = async ({ email }: { email: string | undefined }) => {
    /* Fetch user data */
    try {
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
    } catch (err) {
        console.log(err);
        //process.exit(1);
    }

    return null;
};


export const fetchUserId = async ({ email }: { email: string | undefined }) => {
    try {
        if (email) {
            const user = await prisma
                .user
                .findFirst({
                    where: { email }
                });
            await prisma.$disconnect();
            return user?.id;
        }
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};

/* Tags */
export const fetchTags = async () => {
    /* Fetch all tags */
    try {
        const tags = await prisma
            .tag
            .findMany();
        await prisma.$disconnect();
        return tags;
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return [];
};

export const fetchPostTagIds = async ({
    postId,
    slug,
}: {
    postId?: string,
    slug?: string,
}) => {
    try {
        if (!postId && !slug) {
            throw new Error("postId or slug is required");
        }

        if (postId) {
            const post = await prisma.post.findFirst({
                where: { id: postId },
                include: { tags: true },
            });
            await prisma.$disconnect();
            return post?.tagIds;
        }

        if (slug) {
            const post = await prisma.post.findFirst({
                where: { slug },
                include: { tags: true },
            });
            await prisma.$disconnect();
            return post?.tagIds;
        }
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return [];
    /*     const post = await prisma.post.findFirst({
            where: { id: postId, slug },
            include: { tags: true },
        });
        await prisma.$disconnect();
        return post?.tagIds; */
};

export const fetchPostsByTagName = async ({
    tagName
}: {
    tagName: string
}) => {
    /* Fetch all posts by tag name */
    try {
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
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return [];
};

export const addPostIdToTags = async ({
    postId,
    tagIds
}: {
    postId: string,
    tagIds: string[]
}) => {
    try {
        await prisma.tag.updateMany({
            where: { id: { in: tagIds } },
            data: { postIds: { push: postId } }
        });
        await prisma.$disconnect();
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};

export const addPostIdToTag = async ({
    postId,
    tagId,
}: {
    postId: string,
    tagId: string
}) => {
    try {
        await prisma.tag.update({
            where: { id: tagId },
            data: { postIds: { push: postId } }
        });
        await prisma.$disconnect();
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};

export const removePostIdFromTag = async ({
    postId,
    tagId,
}: {
    postId: string,
    tagId: string,
}) => {
    try {
        const postIds = (
            await prisma.tag.findFirst({ where: { id: tagId } })
        )?.postIds;

        const updatedPostIds = postIds?.filter(id => id !== postId);

        await prisma.tag.update({
            where: { id: tagId },
            data: { postIds: { set: updatedPostIds } },
        })
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};

export const addUserIdToTags = async ({
    userId,
    tagIds
}: {
    userId: string,
    tagIds: string[]
}) => {
    try {
        await prisma.tag.updateMany({
            where: { id: { in: tagIds } },
            data: { userIds: { push: userId } }
        });
        await prisma.$disconnect();
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};

export const addUserIdToTag = async ({
    userId,
    tagId,
}: {
    userId: string,
    tagId: string
}) => {
    try {
        await prisma.tag.update({
            where: { id: tagId },
            data: { userIds: { push: userId } }
        });
        await prisma.$disconnect();
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};

export const createTag = async ({ data }: { data: { name: string } }) => {
    try {
        const tag = await prisma.tag.create({ data });
        await prisma.$disconnect();
        return tag;
    } catch (err) {
        console.log(err);
        //process.exit(1);
    }

    return null;
};

export const updateTag = async ({ id, data }: { id: string, data: { name: string } }) => {
    try {
        const updated = await prisma.tag.update({
            where: { id },
            data,
        });
        await prisma.$disconnect();
        return updated;
    } catch (error) {
        console.log(error);
        //process.exit(1);
    }

    return null;
};