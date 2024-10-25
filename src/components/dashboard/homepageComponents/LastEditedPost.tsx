"use client";

import { Post, Posts } from "@/types";
import { PostCard } from "./PostCard";
import Carousel from "@develnotes/carousel";


export const LastEditedPost = ({ posts }: { posts: Posts | undefined }) => {

    if (posts) {

        const lastEditedPost = posts.sort((a, b) => {
            return Number(b.updatedAt) - Number(a.updatedAt);
        }).slice(0, 3);

        const renderComponent = (item: Post) => <PostCard post={item} />;

        return (
            <div className="last-edited">
                <div className="headline">Continue editing...</div>

                <Carousel
                    list={lastEditedPost}
                    renderComponent={renderComponent}
                />

            </div>
        );
    }
}