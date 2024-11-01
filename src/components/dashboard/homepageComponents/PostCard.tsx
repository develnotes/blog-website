import type { Post } from "@/types";
import Link from "next/link";
import * as config from "@/config";
import Image from "next/image";
import { IconEdit, IconEye, IconStarFilled } from "@tabler/icons-react";

export const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className="homepage-postcard">
            <div className="homepage-postcard__info">
                <div className="homepage-postcard__info__wrapper">
                    <h3 className="homepage-postcard__title">{post.title}</h3>
                    <div className="homepage-postcard__date">
                        <IconStarFilled size={16}/>
                        Created at {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    {
                        post.updatedAt &&
                        <div className="homepage-postcard__date">
                            <IconEdit size={16}/>
                            Last updated {new Date(post.updatedAt).toLocaleDateString()}
                        </div>
                    }
                </div>
                <div className="homepage-postcard__buttons">
                    <Link
                        href={config.paths.dashboard.post(post.slug)}
                        className="button homepage-postcard__button">
                        View
                        <IconEye size={20} />
                    </Link>
                    <Link
                        href={config.paths.dashboard.editPost(post.slug)}
                        className="button homepage-postcard__button">
                        Edit
                        <IconEdit size={20} />
                    </Link>
                </div>
            </div>

            <div className="homepage-postcard__image">
                <Image
                    src={post.image as string}
                    alt="post image"
                    fill
                />
            </div>
        </div>
    );
};
