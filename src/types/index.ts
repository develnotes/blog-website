import type { 
    Post, 
    User, 
    Tag, 
    Account, 
    Session 
} from "@prisma/client";

export type { Post, User, Tag, Account, Session }

export type QuillContents = { 
    delta: string, 
    text: string 
}

export type Data = { 
    body: QuillContents, 
    description: QuillContents, 
    image: string, 
    title: string, 
    tags: Tag[],
}

export type UpdateData = { 
    title: string,
    slug: string, 
    body: QuillContents, 
    description: QuillContents, 
    image: string ,
    tags: Tag[],
}

export type PublishData = {
    slug: string,
}

export type PostData = Omit<
    Post,
    "id" |
    "createdAt" |
    "updatedAt" |
    "publishedAt" |
    "published"
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
    title: string,
    body: string;
    description: string;
    image: string;
    tagIds: string[];
}

export type Posts = Post[];

export type PostFormState = {
    bodyMessage?: string | undefined;
    descriptionMessage?: string | undefined;
    tagsMessage?: string | undefined;
    imageMessage?: string | undefined;
    titleMessage?: string | undefined;
    errorMessage?: string | undefined;
}

export type EditPostFormState = PostFormState; //Omit<PostFormState, "titleMessage">

export type PublishPostFormState = {
    errorMessage?: string | undefined;
}