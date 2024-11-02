"use server";

import { fetchUser } from "@/db";
import { auth } from "@/auth";

export const getUser = async () => {

    const session = await auth();

    if (session) {

        const sessionUser = session.user;

        if (sessionUser) {
            const email = sessionUser.email;

            if (email) {
                const user = await fetchUser({ email });
                return user;
            }
        }
    }
}