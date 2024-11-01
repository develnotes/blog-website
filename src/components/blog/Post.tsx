import { Editor } from "@/quill/editor/Editor";
import type { Post as PostType } from "@/types";
import Image from "next/image";

export const Post = ({ post }: { post: PostType }) => {

    return (
        <div className="post">

            <div className="post__image">
                <Image alt="post image" src={post.image as string} fill />
            </div>

            <div className="post__title">
                {post.title}
            </div>

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
                <Editor id="post-editor"/>
            </div>
        </div>
    );
}