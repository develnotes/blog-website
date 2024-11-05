"use server";

import { fetchTags } from "@/db";

export async function getTags() {

    const tags = await fetchTags();

    return tags;
}