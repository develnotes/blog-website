import { fetch } from "@/db";
import Link from "next/link";

export default async function Posts() {

    const posts = await fetch();

    return (
        <div className="posts-page">
            All posts here...

            <div className="posts">
                <ul className="posts__list">
                    {
                        posts.map((post) => {
                            return (
                                <li className="posts__list__item" key={post.id}>
                                    <Link href={`/dashboard/posts/${post.slug}`}>{post.title}</Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}