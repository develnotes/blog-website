"use server";

import { paths } from "@/app/paths";
import * as db from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type FormState = {
    contentsMessage: string,
    imageMessage: string,
    titleMessage: string,
    errorMessage: string,
}

type PostData = { contents: string, image: string, title: string }
type UpdateData = { slug: string, contents: string, image: string, title: string }

export async function createPost(formState: FormState, postData: PostData) {

    const { contents, image, title } = postData;

    if (title.length === 0) {
        const newFormState: FormState = {
            ...formState, titleMessage: "Give a title for your post",
        }
        return newFormState;
    }

    if (image.length === 0) {
        const newFormState: FormState = {
            ...formState, imageMessage: "Provide an image for your post",
        }
        return newFormState;
    }

    if (contents.length === 0) {
        const newFormState: FormState = {
            ...formState, contentsMessage: "Create a body for your post",
        }
        return newFormState;
    }

    const slug = title.split(" ").join("-").toLowerCase();

    const data: db.Post = { body: contents, slug, title, image };

    
    /* Check slug is unique */
    const results = await db.checkSlugIsUnique(slug);

    if (results) {
        const newFormState: FormState = {
            ...formState, titleMessage: "Sorry, this slug already exists!",
        };

        return newFormState;
    }


    /* Save to DB */
    try {

        await db.create({ data });

        revalidatePath(paths.dashboard.posts());

    } catch (err) {

        if (err instanceof Error) {
            console.log(err.message);

            const newFormState: FormState = {
                ...formState, errorMessage: err.message
            };

            return newFormState;
        } else {
            console.log(err);

            const newFormState: FormState = {
                ...formState, errorMessage: "Something went wrong. See message in the console.",
            };

            return newFormState;
        }
    } finally {

        redirect("/dashboard/posts");
    }
}

export async function updatePost(formState: FormState, updateData: UpdateData) {

    const { slug, contents, image, title } = updateData;

    if (title.length === 0) {
        const newFormState: FormState = {
            ...formState, titleMessage: "Give a title for your post",
        }

        return newFormState;
    }

    if (image.length === 0) {
        const newFormState: FormState = {
            ...formState, imageMessage: "Provide an image for your post",
        }
        return newFormState;
    }

    if (contents.length === 0) {
        const newFormState: FormState = {
            ...formState, contentsMessage: "Create a body for your post",
        }
        return newFormState;
    }

    const data: db.PostUpdates = {
        title,
        body: contents,
        image
    };

    try {

        await db.update({ slug, data });

        revalidatePath(paths.dashboard.post(slug));
        revalidatePath(paths.dashboard.editPost(slug));

    } catch (err) {

        if (err instanceof Error) {
            console.log(err.message);

            const newFormState: FormState = {
                ...formState, errorMessage: err.message
            };

            return newFormState;
        } else {
            console.log(err);

            const newFormState: FormState = {
                ...formState, errorMessage: "Something went wrong. See message in the console.",
            };

            return newFormState;
        }
    }
}
