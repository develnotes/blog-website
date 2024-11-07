"use server";

import { TagPosts } from "@/components/dashboard/tagsPageComponents/TagPosts";
import { fetchPostsByTagName } from "@/db";
import { PostExtended } from "@/types";

export default async function Page({ params }: { params: { tagName: string } }) {

    const { tagName } = params;

    /* Get all posts that contains this tagName and list them below*/
    const posts = await fetchPostsByTagName({ tagName }) as PostExtended[];

    console.log(posts);

    return (
        <div className="tag-page">

            <div className="tag-name">{tagName}</div>
            {
                posts.length > 0 ?
                    (
                        <TagPosts posts={posts} />
                    ) :
                    (
                        <div className="no-posts-message">
                            No posts about &quot;{ tagName }&quot; yet.
                        </div>
                    )
            }
        </div>
    );
};