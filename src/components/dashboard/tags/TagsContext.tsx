"use client";

import { createTag } from "@/db";

import {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";

import type { Tag } from "@/types";

type ContextType = {
    tagName: string;
    setTagName: Dispatch<SetStateAction<string>>;
    tags: Tag[];
    setTags: Dispatch<SetStateAction<Tag[]>>;
    addTag: (tagName: string) => void;
    removeTag: (id: string) => void;
    suggestedTags: Tag[];
    filteredTags: Tag[];
    updateTags: (tag: Tag) => void;
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

export const TagsContext = ({
    savedTags,
    currentTags,
    children
}: {
    savedTags: Tag[],
    currentTags?: Tag[],
    children: React.ReactNode
}) => {

    const [tagName, setTagName] = useState<string>("");
    const [tags, setTags] = useState<Tag[]>(currentTags || []);

    const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

    const updateTags = useCallback((tag: Tag) => {
        if (!tags.map(tag => tag.name).includes(tag.name)) {
            setTags([...tags, tag]);
        }
    }, [tags, setTags]);

    const addTag = useCallback((tagName: string) => {

        const foundInSuggestedTags = suggestedTags
            .find(foundTag => foundTag.name === tagName.toLowerCase());

        if (foundInSuggestedTags) {
            updateTags(foundInSuggestedTags);
        } else {

            const foundInTags = tags
                .find(foundTag => foundTag.name === tagName.toLowerCase());

            const foundInSavedTags = savedTags
                .find(foundTag => foundTag.name === tagName.toLowerCase());

            if (!foundInTags) {
                /* Check if it is in saved tags */
                if (foundInSavedTags) {
                    setTags([...tags, foundInSavedTags]);
                } else {
                    createTag({ data: { name: tagName.toLowerCase() } })
                        .then(tag => {
                            if (tag) {
                                setTags([...tags, tag]);
                            }
                        });
                }
            }
        }
    }, [tags, suggestedTags, updateTags, savedTags]);

    const removeTag = useCallback((id: string) => {
        setTags([...tags.filter(tag => tag.id !== id)]);
    }, [tags]);

    useEffect(() => {
        setSuggestedTags(
            savedTags.filter(foundTag => {
                return !tags.map(tag => tag.id).includes(foundTag.id);
            })
        );
    }, [tags, savedTags]);

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

export const useTags = () => useContext(Context);