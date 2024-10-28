import { auth } from "@/auth";
import { LastEditedPost } from "@/components/dashboard/homepageComponents/LastEditedPost";
import { Options } from "@/components/dashboard/homepageComponents/Options";
import { RecentPosts } from "@/components/dashboard/homepageComponents/RecentPosts";
import { Stats } from "@/components/dashboard/homepageComponents/Stats";
import { getPosts } from "@/data/getPosts";
import { getUser } from "@/data/getUser";

export default async function Dashboard() {

    const session = await auth();

    const user = await getUser(session);

    const userId = user?.id;

    const posts = await getPosts(userId);

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