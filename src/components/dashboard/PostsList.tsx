"use client"

import { Post } from "@prisma/client";
import Link from "next/link";
import { Loader } from "./Loader";
import { useState } from "react";
import Image from "next/image";
import { paths } from "@/app/paths";

export const PostsList = ({ posts }: { posts: Post[] }) => {

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="posts">
            
            <Loader loading={loading} />

            <ul className="posts__list">
                {
                    posts.map((post) => {
                        return (
                            <li className="posts__list__item" key={post.id}>
                                <div className="posts__list__item__info">
                                    <div
                                        className="posts__list__item__title">
                                        {post.title}
                                    </div>
                                    <div>Created: {new Date(post.createdAt).toLocaleDateString()}</div>
                                    <div className="posts__list__item__options">
                                        <Link
                                            className="posts__list__item__view-link"
                                            onClick={() => setLoading(true)}
                                            href={paths.dashboard.post(post.slug)}>
                                            View
                                        </Link>
                                        <Link
                                            className="posts__list__item__edit-link"
                                            onClick={() => setLoading(true)}
                                            href={paths.dashboard.editPost(post.slug)}>
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                                <div className="posts__list__item__image-wrapper">
                                    <Image
                                        className="posts__list__item__image"
                                        src={post.image || "/mountains-8564328_1280.png"}
                                        alt="mountains"
                                        fill
                                    />
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};