import { useTags } from ".";
import type { Tag } from "@/types";

export const Option = ({ tag }: { tag: Tag }) => {

    const { updateTags } = useTags();

    return (
        <li className="tags__suggestions__option"
            onClick={() => updateTags(tag)}>
            {tag.name}
        </li>
    );
};
