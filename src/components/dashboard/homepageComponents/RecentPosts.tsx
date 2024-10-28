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
            <section id="recent">
                <div className="recent-posts">
                    <div className="headline">
                        <div className="headline__text">
                            <h3>Recent Posts</h3>
                        </div>
                        <div className="headline__button">
                            <div className="headline__button__link">
                                <Link href={config.paths.dashboard.posts()}>View all</Link>
                            </div>
                            <IconChevronRight size={20} />
                        </div>
                        <div className="headline__icon">
                            <IconChevronRight size={20} />
                        </div>
                    </div>
                    <Carousel list={posts} renderComponent={renderPost} />
                </div >
            </section>
        );
    }
};
