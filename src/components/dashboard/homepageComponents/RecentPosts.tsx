"use client";

import { Post, Posts } from "@/types";
import Link from "next/link";
import * as config from "@/config";
import { IconChevronRight } from "@tabler/icons-react";
import { PostCard } from "./PostCard";
import Carousel from "@develnotes/carousel";


export const RecentPosts = ({ posts }: { posts: Posts | undefined }) => {

    const renderPost = (item: Post) => <PostCard post={item} />;

    if (posts) {
        return (
            <div className="recent-posts">
                <div className="headline">
                    <div className="headline__text">
                        Recent Posts
                    </div>
                    <div className="headline__button">
                        <div className="headline__button__link">
                            <Link href={config.paths.dashboard.posts()}>View all</Link>
                        </div>
                        <IconChevronRight />
                    </div>
                    <div className="headline__icon">
                        <IconChevronRight />
                    </div>
                </div>
                <Carousel list={posts} renderComponent={renderPost} />
            </div >
        );
    }
};
