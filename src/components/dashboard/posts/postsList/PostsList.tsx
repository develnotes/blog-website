"use client";

import { useState } from "react";
import { Loader } from "@/components/dashboard/Loader";
import { PostCard } from "./PostCard";
import type { PostsList as PostsListType } from "@/types";
import Link from "next/link";
import { paths } from "@/config";


export const PostsList = ({ posts }: { posts: PostsListType }) => {

    const [loading, setLoading] = useState<boolean>(false);

    if (posts.length === 0) {
        return (
            <div className="posts posts__empty">
                <p>There are no posts yet...</p>

                <Link className="link posts__empty__link" href={paths.dashboard.write()}>Write a post</Link>
            </div>
        );
    }

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