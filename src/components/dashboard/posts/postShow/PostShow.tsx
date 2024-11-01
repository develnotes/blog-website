"use client"

import { useEffect, useState } from "react";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/config";
import { PostBody } from "./PostBody";
import type { Post, Posts } from "@/types";
import { PostDescription } from "./PostDescription";


export const PostShow = ({ post, posts }: { post: Post, posts: Posts }) => {

    const [index, setIndex] = useState<number>();

    useEffect(() => {
        posts.forEach((item, index) => {
            if (item.id === post.id) {
                setIndex(index);
            }
        });
    }, [post.id, posts]);

    return (
        <div className="post">
            <div className="post__header">
                {
                    post.image &&
                    <Image
                        className="post__header__image"
                        src={post.image}
                        alt="Header image"
                        fill
                    />
                }
                <Link className="button post__edit-button"
                    href={paths.dashboard.editPost(post.slug)}>
                    <IconEdit />
                    <div className="post__edit-button__text">Edit Post</div>
                </Link>
            </div>

            <div className="post__title">
                <div className="post__title__text">
                    {post.title}
                </div>
            </div>

            {
                post.description &&
                <div className="post__description">
                    <PostDescription initialDelta={post.description} />
                </div>
            }

            <div className="post__body">
                <PostBody initialDelta={post.body} />
            </div>

            <div className="suggestion-menu">
                {
                    (index !== undefined && index > 0) ?
                        <Link href={paths.dashboard.post(posts[index - 1].slug)}>Prev</Link> :
                        <span></span>
                }
                {
                    (index !== undefined) ? <span>{index + 1}</span> : <span></span>
                }
                {
                    (index !== undefined && index < posts.length - 1) ?
                        <Link href={paths.dashboard.post(posts[index + 1].slug)}>Next</Link> :
                        <span></span>
                }
            </div>
        </div>
    );
};