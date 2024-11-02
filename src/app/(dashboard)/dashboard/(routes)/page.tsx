"use server";

import { LastEditedPost } from "@/components/dashboard/homepageComponents/LastEditedPost";
import { Options } from "@/components/dashboard/homepageComponents/Options";
import { RecentPosts } from "@/components/dashboard/homepageComponents/RecentPosts";
import { Stats } from "@/components/dashboard/homepageComponents/Stats";
import { getUserData } from "@/data";

export default async function Dashboard() {

    const user = await getUserData();

    const posts = user?.posts;

    const latestPosts = posts?.slice(0, 5);

    return (
        <div className="home-page">

            <h1 className="home-page__heading">Hello, {user?.name}</h1>

            <Stats posts={posts} />

            <Options />

            <RecentPosts posts={latestPosts} />

            <LastEditedPost posts={posts} />
        </div>
    );
}