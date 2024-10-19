"use client"

import { Editor } from "@/quill/editor/Editor";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/config";
import type { Post } from "@/types";


export const PostShow = ({ post }: { post: Post }) => {

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
                    />}
            </div>

            <div className="post__title">
                <div className="post__title__text">
                    {post.title}
                </div>

                <Link className="button post__edit-button"
                    href={paths.dashboard.editPost(post.slug)}>
                    <IconEdit />
                    <div className="post__edit-button__text">Edit</div>
                </Link>

            </div>

            <div className="post__body">
                <Editor />
            </div>
        </div>
    );
};