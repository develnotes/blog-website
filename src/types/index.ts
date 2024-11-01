import type { Post, User, Account, Session } from "@prisma/client";

export type { Post, User, Account, Session }

export type QuillContents = { delta: string, text: string }

export type Data = { body: QuillContents, description: QuillContents, image: string, title: string }

export type UpdateData = { slug: string, body: QuillContents, description: QuillContents, image: string }

export type PostData = {
    title: string;
    description: string;
    body: string;
    slug: string;
    image: string;
    authorId: string;
}

export type PostUpdates = {
    body: string;
    description: string;
    image: string;
}

export type Posts = Post[];

export type PostFormState = {
    bodyMessage?: string | undefined;
    descriptionMessage?: string | undefined;
    imageMessage?: string | undefined;
    titleMessage?: string | undefined;
    errorMessage?: string | undefined;
}

export type EditPostFormState = {
    bodyMessage?: string | undefined;
    descriptionMessage?: string | undefined;
    imageMessage?: string | undefined;
    errorMessage?: string | undefined;
}