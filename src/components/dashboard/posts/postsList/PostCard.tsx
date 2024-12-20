import type { PostExtended } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/config";
import { IconEdit, IconEye, IconStar, IconTags, IconWorldUp } from "@tabler/icons-react";
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
                    <div className="postcard__info__wrapper">
                        <div className="postcard__title">
                            {post.title}
                        </div>
                        <div className="postcard__author">
                            Author: {post.author.name}
                        </div>
                    </div>

                    <div className="postcard__info__wrapper">
                        <div className="postcard__date">
                            <IconStar size={18} />
                            Created: {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="postcard__date">
                            <IconEdit size={18} />
                            Updated: {new Date(post.updatedAt).toLocaleDateString()}
                        </div>
                        <div className="postcard__date">
                            <IconWorldUp size={18} />
                            {
                                post.published ?
                                    <span>Published at {post.publishedAt?.toLocaleDateString()}</span> :
                                    <span>unpublished</span>
                            }
                        </div>
                    </div>

                    <div className="postcard__info__wrapper">
                        {
                            post.tags &&
                            <div className="postcard__tags">
                                <ul className="postcard__tags__list">
                                    {
                                        post.tags.map(tag => {
                                            return <li className="postcard__tags__list__item" key={tag.id}>
                                                <IconTags size={16} />
                                                {tag.name}
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        }
                    </div>
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
            </div >
            <div className="postcard__image">
                <Image
                    src={post.image || "/mountains-8564328_1280.png"}
                    alt="mountains"
                    fill
                    sizes="200"
                />
            </div>
        </div >
    );
};