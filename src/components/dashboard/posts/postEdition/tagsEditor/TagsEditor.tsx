"use client";

import { useState } from "react";
import { CheckedStatus } from "../checkedStatus";
import { Label } from "../label";
import { Tags } from "@/components/dashboard/tags/Tags";
import { TagSuggestions } from "@/components/dashboard/tags/TagSuggestions";
import { useTags } from "@/components/dashboard/tags";

export const TagsEditor = () => {

    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const { tags } = useTags();

    return (
        <div className="tags-editor">
            <Label>
                Tags
                <CheckedStatus condition={tags.length > 0} />
            </Label>
            <Tags
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
            />
            <TagSuggestions
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
            />
        </div>
    );
};
