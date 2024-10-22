import { Session } from "next-auth";
import * as db from "@/db";

export const getUserData = async (session: Session | null) => {

    if (session) {

        const user = session.user;
        const email = user?.email;

        if (email) {
            const user = await db.fetchUser(email);

            if (user) {

                const { name, email, id } = user;

                if (id) {
                    const posts = await db.fetch(id);
            
                    return { user, posts };
                }
            }
        }
    }
};