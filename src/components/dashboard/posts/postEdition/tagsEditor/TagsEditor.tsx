import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { CheckedStatus } from "../checkedStatus";
import { Label } from "../label";
import { IconPlus, IconX } from "@tabler/icons-react";
import TagsContext, { useTags } from "./TagsContext";

import type { TagType } from "./TagsContext";

export const TagsEditor = () => {

    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    return (
        <div className="tags-editor">
            <Label>
                Tags
                <CheckedStatus condition={true} />
            </Label>
            <TagsContext>
                <Tags
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                />
                <TagSuggestions
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                />
            </TagsContext>
        </div>
    );
};

const Tags = ({
    showSuggestions,
    setShowSuggestions,
}: {
    showSuggestions: boolean,
    setShowSuggestions: Dispatch<SetStateAction<boolean>>,
}) => {

    const {
        tags,
        tagName,
        setTagName,
        addTag,
    } = useTags();
    
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <>
            <div className="tags">
                <ul className="tags__list">
                    {
                        tags.map(tag => {
                            return (
                                <li className="tags__list__item" key={tag.id}>
                                    <Tag tag={tag} />
                                </li>
                            );
                        })
                    }
                    <div className={expanded ? "tags__input tags__input--expanded" : "tags__input"}>
                        {
                            (!expanded) &&
                            <div className="tags__input__icon"
                                onClick={() => {
                                    setExpanded(true);
                                }}>
                                <IconPlus />
                            </div>
                        }
                        {
                            expanded &&
                            <form action=""
                                className="tags__input__form"
                                onSubmit={e => {
                                    e.preventDefault();
                                    addTag(tagName)
                                    setTagName("");
                                }}>
                                <input
                                    autoFocus={true}
                                    type="text"
                                    name="tags"
                                    className="tags__input__inner"
                                    value={tagName}
                                    onChange={e => {
                                        setShowSuggestions(true);
                                        setTagName(e.target.value);
                                    }}
                                    onBlur={() => {
                                        setExpanded(false);
                                        setTimeout(() => {
                                            setTagName("");
                                        }, 300)
                                    }}
                                    autoComplete="off"
                                    onClick={() => setShowSuggestions(!showSuggestions)}
                                />
                            </form>
                        }
                    </div>
                </ul>
            </div>
        </>
    );
};

const Tag = ({tag} : {tag: TagType}) => {

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

const TagSuggestions = ({
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


const Option = ({ tag }: { tag: TagType }) => {

    const { updateTags } = useTags();

    return (
        <li className="tags__suggestions__option"
            onClick={() => updateTags(tag)}>
            {tag.name}
        </li>
    );
};

