import type { PostExtended } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/config";
import { IconEdit, IconEye, IconStar } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";


export const PostCard = ({
    post,
    setLoading,
}: {
    post: PostExtended,
    setLoading: Dispatch<SetStateAction<boolean>>,
}) => {

    return (
        <div className="postcard">
            <div className="postcard__details">
                <div className="postcard__info">
                    <div className="postcard__info__title">
                        {post.title}
                    </div>
                    <div className="postcard__info__author">
                        Author: {post.author.name}
                    </div>
                    <div className="postcard__info__date">
                        <IconStar size={18} />
                        Created: {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="postcard__info__date">
                        <IconEdit size={18} />
                        Updated: {new Date(post.updatedAt).toLocaleDateString()}
                    </div>
                    <>
                        {
                            post.tags &&
                            <div className="postcard__tags">
                                <ul className="postcard__tags__list">
                                    {
                                        post.tags.map(tag => {
                                            return <li className="postcard__tags__list__item" key={tag.id}>
                                                {tag.name}
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        }
                    </>
                </div>
                <div className="postcard__options">
                    <Link
                        className="button postcard__options__view-link"
                        onClick={() => setLoading(true)}
                        href={paths.dashboard.post(post.slug)}>
                        View
                        <IconEye size={20} />
                    </Link>
                    <Link
                        className="button postcard__options__edit-link"
                        onClick={() => setLoading(true)}
                        href={paths.dashboard.editPost(post.slug)}>
                        Edit
                        <IconEdit size={20} />
                    </Link>
                </div>
            </div>
            <div className="postcard__image">
                <Image
                    src={post.image || "/mountains-8564328_1280.png"}
                    alt="mountains"
                    fill
                    sizes="200"
                />
            </div>
        </div>
    );
};