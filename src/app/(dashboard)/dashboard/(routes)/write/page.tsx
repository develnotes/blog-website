"use server";

import { PostCreate } from "@/components/dashboard/posts";
import { Loader } from "@/components/dashboard/Loader";
import { getUserId } from "@/data";


export default async function Write() {

    const userId = await getUserId();

    if (userId) {
        return (
            <div className="write-page">
                <noscript>
                    <div className="no-script-message">
                        The editor needs Javascript to work. Please activate Javascript in the Browser.
                    </div>
                </noscript>

                <PostCreate authorId={userId} />
            </div>
        );
    } else {
        return <Loader loading />
    }
}