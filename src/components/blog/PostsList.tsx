"use client";

import type { Posts } from "@/types"
import { PostCard } from "./PostCard";

export const PostsList = ({ posts }: { posts: Posts }) => {
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