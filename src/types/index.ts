import type { Post, User, Tag, Account, Session } from "@prisma/client";

export type { Post, User, Tag, Account, Session }

export type QuillContents = { delta: string, text: string }

export type Data = { body: QuillContents, description: QuillContents, image: string, title: string }

export type UpdateData = { slug: string, body: QuillContents, description: QuillContents, image: string }

export type PostData = Omit<
    Post,
    "id" |
    "createdAt" |
    "updatedAt" |
    "publishedAt" |
    "tagIds"
>

export type PostExtended = Post & {
    tags: Tag[];
    _count: {
        author: number;
        tags: number;
    },
    author: User;
};

export type PostsList = PostExtended[];

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

export type EditPostFormState = Omit<PostFormState, "titleMessage">
