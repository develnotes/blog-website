import type { Post } from "@/types"
import Image from "next/image";
import Link from "next/link";

export const PostCard = ({ post }: { post: Post }) => {

    return (
        <Link className="postcard-link" href={"/posts/" + post.slug}>
            <div className="postcard">
                <div className="postcard__image">
                    <Image
                        alt="post header image"
                        src={post.image as string}
                        fill={true}
                    />
                </div>
                <div className="postcard__details">
                    <h2 className="postcard__title">{post.title}</h2>
                    <div className="postcard__date">
                        Posted on {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                </div>
                <div className="postcard__overlay"></div>
            </div>
        </Link>
    );
};