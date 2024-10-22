import { auth } from "@/auth";
import { LastEditedPost } from "@/components/dashboard/homepageComponents/LastEditedPost";
import { RecentPosts } from "@/components/dashboard/homepageComponents/RecentPosts";
import { getPosts } from "@/data/getPosts";
import { getUser } from "@/data/getUser";

export default async function Dashboard() {

    const session = await auth();

    const user = await getUser(session);

    const userId = user?.id;

    const posts = await getPosts(userId);

    const latestPosts = posts?.slice(0, 5);

    const dateRange = posts?.map(post => post.createdAt).sort((a, b) => Number(a) - Number(b)) as Date[];
    const initialDate = new Date(dateRange[0]).toLocaleDateString();
    const finalDate = new Date(dateRange[dateRange.length - 1]).toLocaleDateString();

    return (
        <div className="home-page">

            <h1 className="home-page__heading">Hello, {user?.name}</h1>

            <h2>{posts?.length} posts from {initialDate} to {finalDate}</h2>

            <RecentPosts posts={latestPosts} />

            <LastEditedPost posts={posts} />
        </div>
    );
}