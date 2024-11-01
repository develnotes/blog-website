import { Post } from "@/components/blog/Post";
import * as db from "@/db";
import QuillContext, { QuillOptions } from "@/quill/context/QuillContext";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {

    const post = await db.fetchPost(params.slug);

    const options: QuillOptions = {
        theme: "bubble",
        readOnly: true,
    };

    return (
        <QuillContext options={options} initialDelta={post.body}>
            <Post post={post} />
        </QuillContext>
    );
}