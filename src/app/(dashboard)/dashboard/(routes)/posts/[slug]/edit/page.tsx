"use server";

import { getTags } from "@/actions";
import { PostEdit } from "@/components/dashboard/posts";
import TagsContext from "@/components/dashboard/posts/postEdition/tagsEditor/TagsContext";
import { fetchAllPosts, fetchPost } from "@/db";


export default async function Page({ params }: { params: { slug: string } }) {

    const post = await fetchPost(params.slug);

    const tags = await getTags();

    if (post) {
        return (
            <div className="edit-page">
                <noscript>
                    <div className="no-script-message">
                        The editor needs Javascript to work. Please activate Javascript in the Browser.
                    </div>
                </noscript>
                <TagsContext savedTags={tags}>
                    <PostEdit post={post} />
                </TagsContext>
            </div>
        );
    }
}

export async function generateStaticParams() {

    const posts = await fetchAllPosts();

    return posts.map(post => {
        return { slug: post.slug };
    });
}