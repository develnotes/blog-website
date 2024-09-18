export const dynamic = "force-static";

import { PostsList } from "@/components/dashboard/PostsList";
import { fetch } from "@/db";

import { appName } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata =  {
    title: `${appName} dashboard | Posts`
}

export default async function Posts() {
    
    const posts = await fetch();
    
    return (
        <div className="posts-page">
            <PostsList posts={posts} />
        </div>
    );
}
