"use server";

import { TagPosts } from "@/components/dashboard/tagsPageComponents/TagPosts";
import { fetchPostsByTagName } from "@/db";
import { PostExtended } from "@/types";
import { IconTag } from "@tabler/icons-react";

export default async function Page({ params }: { params: { tagName: string } }) {

    const { tagName } = params;

    /* Get all posts that contains this tagName and list them below*/
    const posts = await fetchPostsByTagName({ tagName }) as PostExtended[];

    return (
        <div className="tag-page">

            <div className="tag-name">
                <IconTag size={18} />
                {tagName}
                </div>
            {
                posts && posts.length > 0 ?
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