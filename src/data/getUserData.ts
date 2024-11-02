"use sever";

import { fetchUser } from "@/db";
import { getUserEmail } from "./getUserEmail";

export const getUserData = async () => {
    
    const email = await getUserEmail();

    if (email) {
        const user = await fetchUser({ email });
        return user;
    }
};
