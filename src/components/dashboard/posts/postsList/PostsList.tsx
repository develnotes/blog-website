"use client";

import { useState } from "react";
import { Loader } from "@/components/dashboard/Loader";
import type { Posts } from "@/types";
import { PostCard } from "./PostCard";


export const PostsList = ({ posts, user }: { posts: Posts, user: { name: string, email: string } }) => {

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="posts">

            <Loader loading={loading} full />

            <ul className="posts__list">
                {
                    posts.map((post) => {
                        return (
                            <li className="posts__list__item" key={post.id}>
                                <PostCard
                                    post={post}
                                    user={user}
                                    setLoading={setLoading}
                                />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};