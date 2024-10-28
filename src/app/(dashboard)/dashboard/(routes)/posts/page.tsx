"use server";

import { PostsList } from "@/components/dashboard/posts";
import { auth } from "@/auth";
import { getUserData } from "@/data/getUserData";


export default async function Posts() {

    const session = await auth();

    const data = await getUserData(session);
    
    if (data) {

        const { posts, user } = data;

        const email = user.email as string;
        const name = user.name as string;

        return (
            <div className="posts-page">
                <PostsList posts={posts} user={{ email, name }}/>
            </div>
        );
    }

    return (
        <div className="posts-page">
            {"No posts yet"}
        </div>
    );

}
