import { IconX } from "@tabler/icons-react";
import { useTags } from ".";
import type { TagType } from ".";

export const Tag = ({ tag }: { tag: TagType }) => {

    const { removeTag } = useTags();

    return (
        <div className="tag">
            <div className="tag__text">{tag.name}</div>
            <button className="icon-button tag__button-remove"
                onClick={() => {
                    removeTag(tag.id);
                }}>
                <IconX size={14} />
            </button>
        </div>
    );
};