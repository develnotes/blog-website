import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

import { savedTags } from "./savedTags";

export type TagType = {
    id: string;
    name: string;
}

type ContextType = {
    tagName: string;
    setTagName: Dispatch<SetStateAction<string>>;
    tags: TagType[];
    setTags: Dispatch<SetStateAction<TagType[]>>;
    addTag: (tagName: string) => void;
    removeTag: (id: string) => void;
    suggestedTags: TagType[];
    filteredTags: TagType[];
    updateTags: (tag: TagType) => void;
}

const defaultValue: ContextType = {
    tagName: "",
    setTagName: () => { },
    tags: [],
    setTags: () => { },
    addTag: () => { },
    removeTag: () => { },
    suggestedTags: [],
    filteredTags: [],
    updateTags: () => { }
};

const Context = createContext(defaultValue);

const TagsContext = ({ children }: { children: React.ReactNode }) => {

    const [tagName, setTagName] = useState<string>("");
    const [tags, setTags] = useState<TagType[]>([]);

    const [suggestedTags, setSuggestedTags] = useState<TagType[]>(savedTags);
    const [filteredTags, setFilteredTags] = useState<TagType[]>([]);

    const updateTags = useCallback((tag: TagType) => {
        if (!tags.map(tag => tag.name).includes(tag.name)) {
            setTags([...tags, tag]);
        }
    }, [tags, setTags]);

    const addTag = useCallback((tagName: string) => {

        const foundInSuggestedTags = suggestedTags.find(foundTag => foundTag.name === tagName.toLowerCase());

        if (foundInSuggestedTags) {
            updateTags(foundInSuggestedTags);
        } else {
            const newTag: TagType = {
                id: (Math.random() * 999).toFixed(0),
                name: tagName.toLowerCase(),
            };

            const foundInTags = tags.find(foundTag => foundTag.name === tagName.toLowerCase());
            const foundInSavedTags = savedTags.find(foundTag => foundTag.name === tagName.toLowerCase());

            if (!foundInTags) {
                setTags([...tags, newTag]);
            }

            if (!foundInSavedTags) {
                savedTags.push(newTag);
            }
        }
    }, [tags, suggestedTags, updateTags]);

    const removeTag = useCallback((id: string) => {
        setTags([...tags.filter(tag => tag.id !== id)]);
    }, [tags]);

    useEffect(() => {
        setSuggestedTags(
            savedTags.filter(foundTag => {
                return !tags.includes(foundTag);
            })
        );
    }, [tags]);

    useEffect(() => {
        setFilteredTags(
            suggestedTags.filter(foundTag => {
                return foundTag.name.includes(tagName);
            })
        );
    }, [tagName, suggestedTags]);

    return (
        <Context.Provider value={{
            setTagName,
            setTags,
            tagName,
            tags,
            addTag,
            removeTag,
            suggestedTags,
            filteredTags,
            updateTags,
        }}>
            {children}
        </Context.Provider>
    );
};

export default TagsContext;

export const useTags = () => useContext(Context);