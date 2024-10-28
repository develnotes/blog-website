"use server";

/* Import QuillContext dynamically */
import dynamic from "next/dynamic";
const QuillContext = dynamic(() => import("@/quill/context/QuillContext"), { ssr: false });

/* Import Quill types re-exported from QuillContext  */
import type { QuillOptions, ToolbarConfig } from "@/quill/context/QuillContext";

import { PostEdit } from "@/components/dashboard/posts";

import { fetchAllPosts, fetchPost } from "@/db";

type Props = { params: { slug: string } };


export default async function Page({ params }: Props) {

    const post = await fetchPost(params.slug);

    const toolbarOptions: ToolbarConfig = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];

    const options: QuillOptions = {
        theme: "snow",
        modules: {
            toolbar: "#toolbar"//toolbarOptions
        }
    };

    return (
        <div className="edit-page">
            <noscript>
                <div className="no-script-message">
                    The editor needs Javascript to work. Please activate Javascript in the Browser.
                </div>
            </noscript>
            <QuillContext
                options={options}
                initialContents={post.body}>
                <PostEdit post={post} />
            </QuillContext>
        </div>
    );
}

export async function generateStaticParams() {

    const posts = await fetchAllPosts();

    return posts.map(post => {
        return { slug: post.slug };
    });
}