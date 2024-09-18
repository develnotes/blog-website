import "@/quill/css/snow.css";

/* Import QuillContext dynamically to prevent document issue */
import dynamic from "next/dynamic";
const QuillContext = dynamic(() => import("@/quill/context/QuillContext"), { ssr: false });

/* Import Quill types re-exported from QuillContext  */
import type { QuillOptions, ToolbarConfig } from "@/quill/context/QuillContext";

import { CreatePost } from "@/components/dashboard/CreatePost";

import { appName } from "@/config";


import { Metadata } from "next";

export const metadata: Metadata = {
    title: `${appName} dashboard | Write`
}

export default function Write() {

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
        <div className="write-page">
            <QuillContext options={options}>
                <CreatePost />
            </QuillContext>
        </div>
    );
}