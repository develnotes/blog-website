"use server";

import { paths } from "@/app/paths";
import * as db from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { FormState } from "@/types";

type Data = { contents: string, image: string, title: string, html: string }

export async function createPost(formState: FormState, data: Data, authorId: string) {

    const { contents, image, title, html } = data;

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

        await db.create({
            data: {
                body: contents,
                slug,
                title,
                image,
                html,
                authorId,
            }
        });

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
