import { useErrorMessages } from "@/contexts/ErrorMessagesContext";
import { CheckedStatus } from "../checkedStatus";
import { ErrorMessage } from "../errorMessage";
import { Label } from "../label";
import { Dispatch, SetStateAction, useCallback } from "react";
import * as actions from "@/actions";

export const TitleEditor = ({
    title,
    setTitle,
    editMode,
}: {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    editMode?: boolean,
}) => {

    const { messages, setMessages } = useErrorMessages();

    const onBlur = useCallback(() => {
        if (!editMode) {
            actions.checkTitle(title)
                .then(r => {
                    setMessages({
                        ...messages,
                        titleMessage: r.message
                    });
                });
        }
    }, [title, messages, setMessages, editMode]);

    return (
        <>
            <Label>
                Title
                <CheckedStatus condition={messages.titleMessage === undefined} />
            </Label>
            <input
                type="text"
                name="title"
                className="title-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
                //readOnly={editMode}
                onBlur={onBlur}
            />
            {
                !editMode &&
                <ErrorMessage message={messages.titleMessage} />
            }
        </>
    );
};