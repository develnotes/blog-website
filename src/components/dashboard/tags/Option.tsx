import { useTags } from ".";
import type { TagType } from ".";

export const Option = ({ tag }: { tag: TagType }) => {

    const { updateTags } = useTags();

    return (
        <li className="tags__suggestions__option"
            onClick={() => updateTags(tag)}>
            {tag.name}
        </li>
    );
};
