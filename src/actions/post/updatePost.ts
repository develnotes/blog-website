"use server";

import { paths } from "@/config";
import * as db from "@/db";
import { revalidatePath } from "next/cache";
import type { EditPostFormState, UpdateData } from "@/types";
import { z } from "zod";


const editPostSchema = z.object({
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
});


export async function updatePost(formState: EditPostFormState, updateData: UpdateData) {

    const { body, description, image, slug, tags } = updateData;

    const validation = await editPostSchema.safeParseAsync({
        description,
        body,
        image,
        tags,
    });

    if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;

        const newFormState: EditPostFormState = {
            ...formState,
            bodyMessage: errors.body?.join("; "),
            descriptionMessage: errors.description?.join(";"),
            imageMessage: errors.image?.join("; "),
            tagsMessage: errors.tags?.join(";"),
        }
        return newFormState;
    }

    /* Save */
    try {

        const { body, description, image, tags } = validation.data;

        const tagIds = tags.map(tag => tag.id);

        const formerTagIds = await db.fetchPostTagIds({ slug });

        const updatedPost = await db.updatePost({
            slug,
            data: {
                body: body.delta,
                description: description.delta,
                image,
                tagIds,
            }
        });

        tags.forEach(tag => {
            if (!tag.postIds.includes(updatedPost.id)) {
                db.addPostIdToTag({ postId: updatedPost.id, tagId: tag.id });
            }

            if (!tag.userIds.includes(updatedPost.authorId)) {
                db.addUserIdToTag({ userId: updatedPost.authorId, tagId: tag.id });
            }
        });

        /*  
        Compare former tags with new tags;
        
        If a tag is removed from the post, 
        then we have to remove that post id from 
        the tag's `postIds` list  
        */
        formerTagIds?.forEach(id => {
            if (!tagIds.includes(id)) {
                db.removePostIdFromTag({ postId: updatedPost.id, tagId: id });
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
