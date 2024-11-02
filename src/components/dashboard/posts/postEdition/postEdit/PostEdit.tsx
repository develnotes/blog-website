"use client";

import type { PostExtended, PostFormState } from "@/types";
import ErrorMessagesContext from "@/contexts/ErrorMessagesContext";
import dynamic from "next/dynamic";
import { Loader } from "@/components/dashboard/Loader";

const PostEditor = dynamic(
    () => import("./PostEditor").then(m => m.PostEditor),
    {
        ssr: false,
        loading: () => <Loader loading full />
    }
);

export const PostEdit = ({ post }: { post: PostExtended }) => {

    const initialFormState: PostFormState = {
        imageMessage: "",
        titleMessage: "",
        descriptionMessage: "",
        bodyMessage: "",
        errorMessage: "",
    };

    return (
        <ErrorMessagesContext initialFormState={initialFormState}>
            <PostEditor post={post} />
        </ErrorMessagesContext>
    );
};