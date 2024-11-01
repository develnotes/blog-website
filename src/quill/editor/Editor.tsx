"use client"

import { useQuill } from "../context/QuillContext";

export const Editor = ({id, onBlur}: {id: string, onBlur?: () => void}) => {

    const { editorRef, loading } = useQuill();

    return (
        <div className="ql-editor-wrapper">
            <Loader loading={loading} />
            <div id={id} ref={editorRef} tabIndex={0} onBlur={onBlur}></div>
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

