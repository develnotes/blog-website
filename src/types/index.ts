import type { Post, User, Account, Session } from "@prisma/client";

export type { Post, User, Account, Session };

export type PostData = {
    title: string;
    body: string;
    slug: string;
    image: string;
    html: string;
    authorId: string;
}

export type PostUpdates = {
    body: string,
    image: string,
    html: string
}

export type Posts = Post[];

export type PostFormState = {
    contentsMessage?: string | undefined,
    imageMessage?: string | undefined,
    titleMessage?: string | undefined,
    errorMessage?: string | undefined,
}

export type EditPostFormState = {
    contentsMessage?: string | undefined,
    imageMessage?: string | undefined,
    errorMessage?: string | undefined,
}