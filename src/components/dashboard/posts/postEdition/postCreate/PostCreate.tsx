"use client";

import { PostFormState } from "@/types";
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

export const PostCreate = ({ authorId }: { authorId: string }) => {

    const initialFormState: PostFormState = {
        imageMessage: "",
        titleMessage: "",
        descriptionMessage: "",
        bodyMessage: "",
        errorMessage: "",
    };

    return (
        <ErrorMessagesContext initialFormState={initialFormState}>
            <PostEditor authorId={authorId} />
        </ErrorMessagesContext>
    );
};
