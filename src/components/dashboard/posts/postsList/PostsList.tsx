"use client";

import { useState } from "react";
import { Loader } from "@/components/dashboard/Loader";
import { PostCard } from "./PostCard";
import type { PostsList as PostsListType } from "@/types";


export const PostsList = ({ posts }: { posts: PostsListType }) => {

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