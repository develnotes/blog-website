"use client";

import type { PostExtended } from "@/types";
import Image from "next/image";

import dynamic from "next/dynamic";

const PostDescription = dynamic(
    () => import("./PostDescription").then(m => m.PostDescription),
    { ssr: false },
);
const PostBody = dynamic(
    () => import("./PostBody").then(m => m.PostBody),
    { ssr: false },
);

export const Post = ({ post }: { post: PostExtended }) => {

    return (
        <div className="post">

            <div className="post__image">
                <Image alt="post image" src={post.image as string} fill />
            </div>

            <div className="post__title">
                {post.title}
            </div>

            {
                post.description &&
                <div className="post__description">
                    <PostDescription description={post.description} />
                </div>
            }

            {
                post.tags &&
                <div className="post__tags">
                    <ul className="post__tags__list">
                        {
                            post.tags.map(tag => {
                                return (
                                    <li key={tag.id} className="post__tags__list__item">
                                        {tag.name}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            }
            <div className="post__date">

                <div className="post__date__created">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                </div>
                {
                    post.updatedAt &&
                    <div className="post__date__updated">
                        Last updated on {new Date(post.updatedAt).toLocaleDateString()}
                    </div>
                }
            </div>

            <div className="post__body">
                <PostBody content={post.body} />
            </div>
        </div>
    );
}