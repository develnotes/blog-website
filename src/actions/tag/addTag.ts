"use server";

import { createTag } from "@/db";

export async function addTag(data: { name: string }) {

    const { name } = data;

    try {

        await createTag({ data });

    } catch(err) {

        console.log(err);
    }

    console.log(name);
}