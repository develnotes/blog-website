import "@/quill/css/snow.css";

import dynamic from "next/dynamic";
const QuillContext = dynamic(() => import("@/quill/context/QuillContext"), { ssr: false });
import { QuillOptions } from "quill";
import { ToolbarConfig } from "quill/modules/toolbar";

import { EditPost } from "@/components/dashboard/EditPost";

import { appName } from "@/config";
import { fetch, fetchPost } from "@/db";

import { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await fetchPost(params.slug);

    return {
        title: `${appName} dashboard | Edit ${post.title}`,
    }
}

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
            toolbar: toolbarOptions
        }
    };

    return (
        <div className="edit-page">
            <QuillContext
                options={options}
                initialContents={post.body}>
                <EditPost post={post} />
            </QuillContext>
        </div>
    );
}

export async function generateStaticParams() {
    const posts = await fetch();

    return posts.map(post => {
        return { slug: post.slug };
    });
}