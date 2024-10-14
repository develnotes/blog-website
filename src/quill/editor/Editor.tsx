"use client"

import { useQuill } from "../context/QuillContext";

export const Editor = () => {

    const { editorRef, loading } = useQuill();

    return (
        <div className="ql-editor-wrapper">
            <Loader loading={loading} />
            <div ref={editorRef}></div>
        </div>
    );
};


const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <div className={`ql-editor-loader ${loading ? "ql-editor-loader--loading" : ""}`}>
            {loading && "Loading..."}
        </div>
    );
};

