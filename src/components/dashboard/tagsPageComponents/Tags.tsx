import { paths } from "@/config";
import { Tag } from "@/types";
import Link from "next/link";

export const Tags = ({ tags }: { tags: Tag[] }) => {

    return (
        <div className="tags">
            <ul className="tags__list">
                {
                    tags.map(tag => {
                        return (
                            <Link href={paths.dashboard.tag(tag.name)}>
                                <li className="tags__list__item" key={tag.id}>
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