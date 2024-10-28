"use server";

/* Import QuillContext dynamically to prevent document issue */
import dynamic from "next/dynamic";
const QuillContext = dynamic(() => import("@/quill/context/QuillContext"), { ssr: false });

/* Import Quill types re-exported from QuillContext  */
import type { QuillOptions, ToolbarConfig } from "@/quill/context/QuillContext";

import { PostCreate } from "@/components/dashboard/posts";

import { auth } from "@/auth";
import { fetchUser } from "@/db";


export default async function Write() {

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

    const session = await auth();

    const email = session?.user?.email as string;

    const user = await fetchUser({ email });

    const authorId = user?.id as string;

    return (
        <div className="write-page">
            <noscript>
                <div className="no-script-message">
                    The editor needs Javascript to work. Please activate Javascript in the Browser.
                </div>
            </noscript>
            <QuillContext options={options}>
                <PostCreate authorId={authorId} />
            </QuillContext>
        </div>
    );
}