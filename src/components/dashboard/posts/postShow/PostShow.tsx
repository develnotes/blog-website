"use client"

import { useEffect, useState } from "react";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/config";
import type { Post, Tag } from "@/types";
import dynamic from "next/dynamic";

type Data = {
    slug: string,
    posts: (Post & { tags: Tag[] })[],
}

const PostBody = dynamic(
    () => import("./PostBody").then(m => m.PostBody),
    { ssr: false }
);

const PostDescription = dynamic(
    () => import("./PostDescription").then(m => m.PostDescription),
    { ssr: false }
);

const PostTags = dynamic(
    () => import("./PostTags").then(m => m.PostTags),
    { ssr: false },
);

export const PostShow = ({ data }: { data: Data }) => {

    const [index, setIndex] = useState<number>();

    const { slug, posts } = data;

    const post = posts?.filter(post => post.slug === slug)[0];

    const { tags } = post

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
                tags &&
                <div className="post__tags">
                    <PostTags tags={tags} />
                </div>
            }

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