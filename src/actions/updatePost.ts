"use server";

import { paths } from "@/app/paths";
import * as db from "@/db";
import { revalidatePath } from "next/cache";
import type { EditPostFormState } from "@/types";
import { z } from "zod";


const editPostSchema = z
    .object({
        contents: z.string().min(10, {
            message: "Create a body for your post"
        }),
        html: z.string().min(1),
        image: z.string().min(1, {
            message: "Provide an image for your post"
        }),
    });

type UpdateData = { slug: string, contents: string, image: string, html: string }

export async function updatePost(formState: EditPostFormState, updateData: UpdateData) {

    const { contents, image, html, slug } = updateData;

    const validation = await editPostSchema.safeParseAsync({
        contents,
        image,
        html
    });

    if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;

        const newFormState: EditPostFormState = {
            ...formState,
            contentsMessage: errors.contents?.join("; "),
            imageMessage: errors.image?.join("; "),
        }
        return newFormState;
    }

    /* Save */
    try {

        const { contents, html, image } = validation.data;

        await db.update({
            slug,
            data: {
                body: contents,
                image,
                html,
            }
        });

        revalidatePath(paths.dashboard.post(slug));
        revalidatePath(paths.dashboard.editPost(slug));

    } catch (err) {

        if (err instanceof Error) {
            console.log(err.message);

            const newFormState: EditPostFormState = {
                ...formState, errorMessage: err.message
            };

            return newFormState;
        } else {
            console.log(err);

            const newFormState: EditPostFormState = {
                ...formState, errorMessage: "Something went wrong. See message in the console.",
            };

            return newFormState;
        }
    }

    return {} as EditPostFormState;
}
