"use client";

import type { PostExtended } from "@/types"
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { PostCardTitle } from "./PostCardTitle";

import dynamic from "next/dynamic";

const PostCardDescription = dynamic(
    () => import("./PostCardDescription").then(m => m.PostCardDescription), 
    { ssr: false }
);

export const PostCard = ({ post, headline }: { post: PostExtended, headline?: boolean }) => {

    return (
        <>
            <Link
                className="postcard-link"
                href={"/posts/" + post.slug}
                draggable="false"
                data-tooltip-id="postcard-tooltip"
                data-tooltip-html={`<p>${post.title}</p>`}>

                <div
                    className={
                        headline ?
                            "postcard postcard__headline" :
                            "postcard"
                    }>
                    <div className="postcard__image">
                        <Image
                            alt="post header image"
                            src={post.image as string}
                            fill={true}
                        />
                    </div>
                    <div className="postcard__details">
                        <div className="postcard__title">
                            {
                                headline ?
                                    <h2>{post.title}</h2> :
                                    <PostCardTitle title={post.title} />
                            }
                        </div>
                        <div className="postcard__date">
                            Posted on {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="postcard__tags">
                            <ul className="postcard__tags__list">
                                {
                                    post.tags.map(tag => {
                                        return (
                                            <li key={tag.id} className="postcard__tags__list__item">
                                                {tag.name}
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        {
                            (headline && post.description) &&
                            <div className="postcard__description">
                                <PostCardDescription description={post.description} />
                            </div>
                        }
                    </div>
                    <div className="postcard__overlay"></div>
                </div>
            </Link>
            <Tooltip
                id="postcard-tooltip"
                className="postcard-tooltip"
                float={true}
                delayHide={0}
                delayShow={400}
                noArrow={true}
                opacity={0.75}
                variant="light"
            />
        </>
    );
};
