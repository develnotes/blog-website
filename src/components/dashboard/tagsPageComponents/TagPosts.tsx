import { paths } from "@/config";
import { PostExtended } from "@/types";
import Link from "next/link";

export const TagPosts = ({ posts }: { posts: PostExtended[] }) => {
    return (
        <div className="tag-posts">
            <ul className="tag-posts__list">
                {
                    posts.map(post => {
                        return (
                            <Link href={paths.dashboard.post(post.slug)}>
                                <li className="tag-posts__list__item" key={post.id}>
                                    <div className="tag-post">
                                        <div className="tag-post__title">
                                            {post.title}
                                        </div>
                                        <div className="tag-posts__list__dates"></div>
                                        <div className="tag-post__description"></div>
                                        <div className="tag-post__tags">
                                            <ul className="tag-post__tags__list">
                                                {
                                                    post.tags.map(tag => {
                                                        return <li className="tag-post__tags__list__item">
                                                            {tag.name}
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        );
                    })
                }
            </ul>
        </div>
    );
};
