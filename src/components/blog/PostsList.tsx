"use client";

import type { PostExtended } from "@/types"
import { PostCard } from "./PostCard";

export const PostsList = ({ posts }: { posts: PostExtended[] }) => {
    return (
        <div className="posts">
            <ul className="posts__list">
                {
                    posts.map(post => {
                        return (
                            <li className="posts__list__item" key={post.id}>
                                <PostCard post={post} />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};