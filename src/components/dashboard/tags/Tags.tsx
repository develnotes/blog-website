import { Dispatch, SetStateAction, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { Tag, useTags } from ".";

export const Tags = ({
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
