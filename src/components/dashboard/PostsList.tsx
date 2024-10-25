"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "./Loader";
import { paths } from "@/config";
import type { Posts } from "@/types";
import { IconEdit, IconEye, IconStar } from "@tabler/icons-react";


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
                                <div className="posts__list__item__wrapper">
                                    <div className="posts__list__item__info">
                                        <div className="posts__list__item__info__title">
                                            {post.title}
                                        </div>
                                        <div className="posts__list__item__info__author">Author: {user.name}</div>
                                        <div className="posts__list__item__info__date">
                                            <IconStar size={18}/>
                                            Created: {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="posts__list__item__info__date">
                                            <IconEdit size={18} />
                                            Updated: {new Date(post.updatedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="posts__list__item__options">
                                        <Link
                                            className="button posts__list__item__options__view-link"
                                            onClick={() => setLoading(true)}
                                            href={paths.dashboard.post(post.slug)}>
                                            View
                                            <IconEye size={20} />
                                        </Link>
                                        <Link
                                            className="button posts__list__item__options__edit-link"
                                            onClick={() => setLoading(true)}
                                            href={paths.dashboard.editPost(post.slug)}>
                                            Edit
                                            <IconEdit size={20} />
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