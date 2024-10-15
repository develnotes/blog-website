"use server";

import { PostsList } from "@/components/dashboard/PostsList";
import { fetch } from "@/db";

import { auth } from "@/auth";
import { getUser } from "@/actions/getUser";


export default async function Posts() {

    const session = await auth();

    if (session) {
        const user = session.user;
        const email = user?.email;

        if (email) {
            const user = await getUser(email);
            const userId = user?.id;
            const name = user?.name as string;
            
            if (userId) {
                const posts = await fetch(userId);
                
                return (
                    <div className="posts-page">
                        <PostsList posts={posts} user={{ email, name }}/>
                    </div>
                );
            }
        }
    }

    return (
        <div className="posts-page">
            {"No posts yet"}
        </div>
    );

}
