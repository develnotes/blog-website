"use client";

import type { PostExtended } from "@/types"
import { PostCard } from "./PostCard";

export const PostsList = ({ posts }: { posts: PostExtended[] }) => {
    return (
        <div className="posts">
            <ul className="posts__list">
                <div className="posts__headline">
                    {
                        posts[0] && (
                            <PostCard post={posts[0]} headline />
                        )
                    }
                </div>
                {
                    posts.slice(1).map(post => {
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