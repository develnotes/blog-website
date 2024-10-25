"use server";

import * as db from "@/db";

import { Session } from "next-auth";

export const getUser = async (session: Session | null) => {

    if (session) {

        const user = session.user;
        const email = user?.email;

        if (email) {
            const user = await db.fetchUser({ email });

            return user;
        }
    }
}