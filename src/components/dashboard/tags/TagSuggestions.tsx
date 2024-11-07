import { Dispatch, SetStateAction } from "react";
import { useTags, Option } from ".";
import { IconX } from "@tabler/icons-react";

export const TagSuggestions = ({
    showSuggestions,
    setShowSuggestions,
}: {
    showSuggestions: boolean,
    setShowSuggestions: Dispatch<SetStateAction<boolean>>,
}) => {

    const {
        tagName,
        suggestedTags,
        filteredTags,
    } = useTags();

    if (!showSuggestions) return null;

    return (
        <ul className="tags__suggestions">
            <button className="icon-button tags__suggestions__button-close"
                onClick={() => setShowSuggestions(false)}>
                <IconX size={14} />
            </button>
            {
                tagName.length > 0 ?
                    (
                        filteredTags.length > 0 ?
                            (
                                filteredTags
                                    .map(tag => {
                                        return (
                                            <Option key={tag.id} tag={tag} />
                                        );
                                    })
                            ) :
                            <div>No results</div>
                    ) :
                    (
                        suggestedTags
                            .map(tag => {
                                return (
                                    <Option key={tag.id} tag={tag} />
                                );
                            })
                    )
            }
        </ul>
    );
};