import type {Tag} from "@/types";

export const PostTags = ({tags}: {tags: Tag[]}) => {
    return (
        <ul className="post__tags__list">
            {
                tags.map(tag => {
                    return (
                        <li className="post__tags__list__item" key={tag.id}>
                            {tag.name}
                        </li>
                    );
                })
            }
        </ul>
    );
};
