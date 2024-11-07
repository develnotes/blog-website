"use server";

import { PostCreate } from "@/components/dashboard/posts";
import { Loader } from "@/components/dashboard/Loader";
import { getUserId } from "@/data";
import { getTags } from "@/actions";
import { TagsContext } from "@/components/dashboard/tags/TagsContext";


export default async function Write() {

    const userId = await getUserId();

    const tags = await getTags();

    if (userId) {
        return (
            <div className="write-page">
                <noscript>
                    <div className="no-script-message">
                        The editor needs Javascript to work. Please activate Javascript in the Browser.
                    </div>
                </noscript>
                <TagsContext savedTags={tags}>
                    <PostCreate authorId={userId} />
                </TagsContext>
            </div>
        );
    } else {
        return <Loader loading />
    }
}