"use client";

import { useState } from "react";
import { CheckedStatus } from "../checkedStatus";
import { Label } from "../label";
import { Tags } from "@/components/dashboard/tags/Tags";
import { TagSuggestions } from "@/components/dashboard/tags/TagSuggestions";

export const TagsEditor = () => {

    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    return (
        <div className="tags-editor">
            <Label>
                Tags
                <CheckedStatus condition={true} />
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
