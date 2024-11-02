"use server";

import { auth } from "@/auth";

import { 
    fetchAllPosts,
    fetchPosts,
    fetchUser,
    fetchUserId 
} from "@/db";


export const getUserId = async () => {
    const session = await auth();

    if (session) {
        const sessionUser = session.user;

        if (sessionUser) {
            const email = sessionUser.email;

            if (email) {
                const userId = await fetchUserId({ email });
                return userId;
            }
        }
    }
};

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

export const getPosts = async () => {
    const authorId = await getUserId();

    if (authorId) {
        const posts = await fetchPosts({ authorId });
        return posts;
    }
};

export const getAllPosts = async () => {
    const posts = await fetchAllPosts();
    return posts;
};

export const getUserData = async () => {
    const email = await getUserEmail();

    if (email) {
        const user = await fetchUser({ email });
        return user;
    }
};
