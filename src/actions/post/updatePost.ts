"use server";

import { paths } from "@/config";
import * as db from "@/db";
import { revalidatePath } from "next/cache";
import type { EditPostFormState, UpdateData } from "@/types";
import { z } from "zod";


const editPostSchema = z
    .object({
        description: z.object({
            text: z.string().min(10, { message: "Give a description for your post" }),
            delta: z.string(),
        }),

        body: z.object({
            text: z.string().min(10, { message: "Create a body for your post" }),
            delta: z.string(),
        }),

        image: z.string().min(1, { message: "Provide an image for your post" }),
    });


export async function updatePost(formState: EditPostFormState, updateData: UpdateData) {

    const { body, description, image, slug } = updateData;

    const validation = await editPostSchema.safeParseAsync({
        description,
        body,
        image,
    });

    if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;

        const newFormState: EditPostFormState = {
            ...formState,
            bodyMessage: errors.body?.join("; "),
            descriptionMessage: errors.description?.join(";"),
            imageMessage: errors.image?.join("; "),
        }
        return newFormState;
    }

    /* Save */
    try {

        const { body, description, image } = validation.data;

        await db.update({
            slug,
            data: {
                body: body.delta,
                description: description.delta,
                image,
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
