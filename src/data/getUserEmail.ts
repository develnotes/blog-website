"use server";

import { auth } from "@/auth";

export const getUserEmail = async () => {
    const session = await auth();

    if (session) {
        const sessionUser = session.user;

        if (sessionUser) {
            const email = sessionUser.email;

            if (email) {
                return email;
            }
        }
    }
};