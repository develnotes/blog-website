"use server"

import { PrismaClient, Post as PostWithID } from "@prisma/client";

const prisma = new PrismaClient();

export type Post = { title: string, body: string, slug: string };
export type Posts = PostWithID[];

export const create = async ({ data }: { data: Post }) => {

    async function main() {
        await prisma.post.create({
            data
        });
    }

    main()
        .catch(async (e) => {
            console.error(e)
            process.exit(1)
        })
        .finally(async () => {
            await prisma.$disconnect()
        })
};

export const fetch = async () => {
    const posts = await prisma.post.findMany();
    return posts as Posts;
};

export const fetchPost = async (slug: string) => {

    const post = await prisma.post.findUnique({
        where: { slug }
    });
    return post as PostWithID;
};