"use server";

import { Session } from "next-auth";
import * as db from "@/db";

export const getUser = async (session: Session | null) => {

    if (session) {

        const sessionUser = session.user;

        if (sessionUser) {
            const email = sessionUser.email;

            if (email) {
                const user = await db.fetchUser({ email });
                return user;
            }
        }
    }
}