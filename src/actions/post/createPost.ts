"use server";

import { paths } from "@/config";
import * as db from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Data, PostFormState, QuillContents } from "@/types";
import { z } from "zod";
import { TagType } from "@/components/dashboard/tags";

const createSlug = (s: string) => {
    return s.split(" ").join("-").toLowerCase();
};

const imageURLSchema = z.object({
    url: z
        .string()
        .min(1, { message: "Provide an image for your post" })
        .refine((val) => val.startsWith("https"), {
            message: "Only secure urls are allowed"
        })
});

const titleSchema = z.object({
    title: z
        .string()
        .min(10, { message: "Title must have at least 10 characters" })
        .refine(val => !val.match(/[^a-z0-9- ]/gi), {
            message: "Only letters and digits are allowed",
        })
        .refine(async (title) => {
            const slug = createSlug(title);

            /* Check slug is unique */
            const results = await db.checkSlugIsUnique(slug);

            return !results;
        }, { message: "This title already exists!" }),
});

const descriptionSchema = z.object({
    description: z.object({
        text: z
            .string()
            .min(10, { message: "Post description must have at least 10 characters" }),
        delta: z.string(),
    }),
});

const bodySchema = z.object({
    body: z.object({
        text: z
            .string()
            .min(10, { message: "Don't forget to write your post!" }),
        delta: z.string(),
    }),
});

const tagsSchema = z.object({
    tags: z.array(z.object({
        id: z.string(),
        name: z
            .string()
            .min(3, { message: "Tag name must have at least three characters" }),
        postIds: z.array(z.string()),
        userIds: z.array(z.string()),
    }))
});

const postSchema = z.object({
    title: z
        .string()
        .min(10, { message: "Title must have at least 10 characters" })
        .refine(val => !val.match(/[^a-z0-9- ]/gi), {
            message: "Only letters and digits are allowed",
        })
        .refine(async (title) => {
            const slug = createSlug(title);

            /* Check slug is unique */
            const results = await db.checkSlugIsUnique(slug);

            return !results;
        }, { message: "Sorry, this title already exists!" }),

    description: z.object({
        text: z.string().min(10, { message: "Give a description for your post" }),
        delta: z.string(),
    }),

    body: z.object({
        text: z.string().min(10, { message: "Create a body for your post" }),
        delta: z.string(),
    }),

    tags: z.array(z.object({
        id: z.string(),
        name: z.string().min(3, { message: "Tag names must be strings" }),
        postIds: z.array(z.string()),
        userIds: z.array(z.string()),
    })),

    image: z.string().min(1, { message: "Provide an image for your post" }),

    slug: z.string().transform(async (title) => createSlug(title)),
});


export async function checkTitle(title: string) {
    const titleValidation = await titleSchema.safeParseAsync({ title });

    if (!titleValidation.success) {
        const errors = titleValidation.error.flatten().fieldErrors;
        return { message: errors.title?.join("; ") };
    }

    return { message: undefined };
}

export async function checkDescription(description: QuillContents) {
    const descriptionValidation = descriptionSchema.safeParse({ description });

    if (!descriptionValidation.success) {
        const errors = descriptionValidation.error.flatten().fieldErrors;
        return { message: errors.description?.join(";") };
    }

    return { message: undefined };
}

export async function checkBody(body: QuillContents) {
    const bodyValidation = bodySchema.safeParse({ body });

    if (!bodyValidation.success) {
        const errors = bodyValidation.error.flatten().fieldErrors;
        return { message: errors.body?.join(";") };
    }

    return { message: undefined };
}

export async function checkTags(tags: TagType[]) {
    const tagsValidation = tagsSchema.safeParse({ tags });

    if (!tagsValidation.success) {
        const errors = tagsValidation.error.flatten().fieldErrors;
        return { message: errors.tags?.join(";") };
    }
}

export async function checkImageURL(imageURL: string) {
    const imageURLValidation = imageURLSchema.safeParse({ imageURL });

    if (!imageURLValidation.success) {
        const errors = imageURLValidation.error.flatten().fieldErrors;
        return { message: errors.url?.join("; ") };
    }

    return { message: undefined };
}

export async function createPost(formState: PostFormState, data: Data, authorId: string) {

    const { body, description, image, title, tags } = data;

    const validation = await postSchema.safeParseAsync({
        title,
        description,
        body,
        tags,
        image,
        slug: title,
    });

    if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;

        const newFormState: PostFormState = {
            ...formState,
            titleMessage: errors.title?.join("; "),
            descriptionMessage: errors.description?.join(";"),
            bodyMessage: errors.body?.join("; "),
            tagsMessage: errors.tags?.join(";"),
            imageMessage: errors.image?.join("; "),
        }

        return newFormState;
    }

    /* Save to DB */
    try {

        const { body, description, image, slug, title, tags } = validation.data;

        const tagIds = tags.map(tag => tag.id);

        const createdPost = await db.createPost({
            data: {
                body: body.delta,
                description: description.delta,
                slug,
                title,
                image,
                authorId,
                tagIds,
            }
        });

        /* Update tags with the created post Id */
        db.addPostIdToTags({ postId: createdPost.id, tagIds });

        tags.forEach(tag => {
            if (!tag.userIds.includes(authorId)) {
                db.addUserIdToTag({ userId: createdPost.authorId, tagId: tag.id });
            }
        });

    } catch (err) {

        if (err instanceof Error) {
            console.log(err.message);

            const newFormState: PostFormState = {
                ...formState, errorMessage: err.message
            };

            return newFormState;
        } else {
            console.log(err);

            const newFormState: PostFormState = {
                ...formState, errorMessage: "Something went wrong. See message in the console.",
            };

            return newFormState;
        }
    }

    revalidatePath(paths.dashboard.posts());
    redirect("/dashboard/posts");
}
