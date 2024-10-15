"use server";

import * as db from "@/db";

export async function getUser(id: string) {

    return await db.fetchUser(id);
};