import { paths } from "@/config";
import { Tag } from "@/types";
import { IconTag } from "@tabler/icons-react";
import Link from "next/link";

export const Tags = ({ tags }: { tags: Tag[] }) => {

    return (
        <div className="tags">
            <ul className="tags__list">
                {
                    tags.map(tag => {
                        return (
                            <Link href={paths.dashboard.tag(tag.name)} key={tag.id}>
                                <li className="tags__list__item">
                                    <IconTag size={16} />
                                    {tag.name}
                                </li>
                            </Link>
                        );
                    })
                }
            </ul>
        </div>
    );
};