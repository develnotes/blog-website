import { Session } from "next-auth";
import * as db from "@/db";

export const getUserId = async (session: Session | null) => {

    if (session) {

        const sessionUser = session.user;

        if (sessionUser) {
            const email = sessionUser.email;

            if (email) {
                const user = await db.fetchUser({ email });

                if (user) {
                    return user.id;
                }
            }
        }
    }
};