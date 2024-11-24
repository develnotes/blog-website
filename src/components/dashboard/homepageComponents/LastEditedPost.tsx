"use client";

import { Post, Posts } from "@/types";
import { PostCard } from "./PostCard";
import Carousel from "@develnotes/carousel";
import { IconChevronRight } from "@tabler/icons-react";


export const LastEditedPost = ({ posts }: { posts: Posts | undefined }) => {

    const renderComponent = (item: Post) => <PostCard post={item} />;

    if (posts && posts.length > 0) {

        const lastEditedPost = posts
            .sort((a, b) => {
                return Number(b.updatedAt) - Number(a.updatedAt);
            })
            .slice(0, 5); /* Show 5 posts max */

        return (
            <section id="last-edited">
                <div className="last-edited">
                    <div className="headline">
                        <h3>Continue editing</h3>
                        <IconChevronRight size={20} />
                    </div>

                    <Carousel
                        list={lastEditedPost}
                        renderComponent={renderComponent}
                    />
                </div>
            </section>
        );
    } else {
        return null;
    }
};