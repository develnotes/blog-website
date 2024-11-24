"use server";

import { LastEditedPost } from "@/components/dashboard/homepageComponents/LastEditedPost";
import { Options } from "@/components/dashboard/homepageComponents/Options";
import { RecentPosts } from "@/components/dashboard/homepageComponents/RecentPosts";
import { Stats } from "@/components/dashboard/homepageComponents/Stats";
import { getUserData } from "@/data";

export default async function Dashboard() {

    const user = await getUserData();

    const posts = user?.posts;

    //const limited = posts?.reverse().slice(0, 2);

    return (
        <div className="home-page">

            <h1 className="home-page__heading">Hello, {user?.name}</h1>

            <Stats posts={posts} />

            <Options />

            {/* TODO: Pass only published posts */}
            <RecentPosts posts={posts} />

            {/* TODO: Pass only the drafts (unpublished) posts */}
            <LastEditedPost posts={posts} />
        </div>
    );
}