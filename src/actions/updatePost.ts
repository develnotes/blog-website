"use server";

import { paths } from "@/app/paths";
import * as db from "@/db";
import { revalidatePath } from "next/cache";
import type { FormState } from "@/types";

type UpdateData = { slug: string, contents: string, image: string, title: string, html: string }

export async function updatePost(formState: FormState, updateData: UpdateData) {

    const { slug, contents, image, title, html } = updateData;

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
        image,
        html,
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
