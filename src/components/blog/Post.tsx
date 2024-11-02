import { Editor } from "@/quill/editor/Editor";
import type { PostExtended } from "@/types";
import Image from "next/image";

import dynamic from "next/dynamic";

const QuillContext = dynamic(
    () => import("@/quill/context/QuillContext"),
    { ssr: false },
);

import { QuillOptions } from "@/quill/context/QuillContext";

export const Post = ({ post }: { post: PostExtended }) => {

    const options: QuillOptions = {
        theme: "bubble",
        readOnly: true,
    };

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
                <QuillContext options={options} initialDelta={post.body}>
                    <Editor id="post-editor" />
                </QuillContext>
            </div>
        </div>
    );
}