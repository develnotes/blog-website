"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "./Loader";
import { paths } from "@/app/paths";
import type { Post } from "@/types";


export const PostsList = ({ posts, user }: { posts: Post[], user: { name: string, email: string } }) => {

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="posts">

            <Loader loading={loading} full />

            <ul className="posts__list">
                {
                    posts.map((post) => {
                        return (
                            <li className="posts__list__item" key={post.id}>
                                <div className="posts__list__item__wrapper">
                                    <div className="posts__list__item__info">
                                        <div className="posts__list__item__info__title">
                                            {post.title}
                                        </div>
                                        <div>Author: { user.name }</div>
                                        <div className="posts__list__item__info__date">Created: {new Date(post.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="posts__list__item__options">
                                        <Link
                                            className="button posts__list__item__options__view-link"
                                            onClick={() => setLoading(true)}
                                            href={paths.dashboard.post(post.slug)}>
                                            View
                                        </Link>
                                        <Link
                                            className="button posts__list__item__options__edit-link"
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
                                        sizes="200"
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