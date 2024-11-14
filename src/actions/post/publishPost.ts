"use server";

import * as db from "@/db";
import { PublishPostFormState, PublishData } from "@/types";

export async function publishPost(formState: PublishPostFormState, publishData: PublishData) {

    const { slug } = publishData;

    try {
        const publishPost = await db.publishPost({
            slug,
        });
    } catch (err) {

        if (err instanceof Error) {
            console.log(err.message);

            const newFormState: PublishPostFormState = {
                ...formState, errorMessage: err.message
            };

            return newFormState;
        } else {
            console.log(err);

            const newFormState: PublishPostFormState = {
                ...formState, errorMessage: "Something went wrong. See message in the console." 
            };

            return newFormState;
        }
    }

    return {} as PublishPostFormState;
}