import type { Post } from "@/types";
import Link from "next/link";
import * as config from "@/config";
import Image from "next/image";
import { IconEdit, IconEye, IconStarFilled } from "@tabler/icons-react";

export const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className="post-card">
            <div className="post-card__info">
                <div className="post-card__info__wrapper">
                    <h3 className="post-card__title">{post.title}</h3>
                    <div className="post-card__date">
                        <IconStarFilled size={20}/>
                        Created at {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    {
                        post.updatedAt &&
                        <div className="post-card__date">
                            <IconEdit size={20}/>
                            Last updated {new Date(post.updatedAt).toLocaleDateString()}
                        </div>
                    }
                </div>
                <div className="post-card__buttons">
                    <Link
                        href={config.paths.dashboard.post(post.slug)}
                        className="button post-card__button">
                        View
                        <IconEye size={20} />
                    </Link>
                    <Link
                        href={config.paths.dashboard.editPost(post.slug)}
                        className="button post-card__button">
                        Edit
                        <IconEdit size={20} />
                    </Link>
                </div>
            </div>

            <div className="post-card__image">
                <Image
                    src={post.image as string}
                    alt="post image"
                    fill
                />
            </div>
        </div>
    );
};
