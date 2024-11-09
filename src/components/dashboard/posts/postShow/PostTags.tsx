import { paths } from "@/config";
import type { Tag } from "@/types";
import { IconTag } from "@tabler/icons-react";
import Link from "next/link";

export const PostTags = ({ tags }: { tags: Tag[] }) => {
    return (
        <ul className="post__tags__list">
            {
                tags.map(tag => {
                    return (
                        <Link href={paths.dashboard.tag(tag.name)} key={tag.id}>
                            <li className="post__tags__list__item">
                                <IconTag size={18} />
                                {tag.name}
                            </li>
                        </Link>
                    );
                })
            }
        </ul>
    );
};
