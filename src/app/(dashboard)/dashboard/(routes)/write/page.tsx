"use server";

import { PostCreate } from "@/components/dashboard/posts";
import { getUserId } from "@/data";
import { getTags } from "@/actions";
import { TagsContext } from "@/components/dashboard/tags/TagsContext";


export default async function Write() {

    const userId = await getUserId();

    const tags = await getTags();

    // If user is logged in, show the editor
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
    }

    // If user is not logged in, show a message
    return <div className="write-page">You need to be logged in to write a post.</div>;
}