"use client";

import { EditPostFormState, PostFormState, PublishPostFormState } from "@/types";

import { 
    createContext, 
    Dispatch, 
    SetStateAction, 
    useContext, 
    useState 
} from "react";

const initialFormStateValue = {
    imageMessage: "",
    titleMessage: "",
    descriptionMessage: "",
    bodyMessage: "",
    errorMessage: "",
};

type ContextType = {
    messages: PostFormState | EditPostFormState | PublishPostFormState,
    setMessages: Dispatch<SetStateAction<PostFormState | EditPostFormState | PublishPostFormState>>,
    initialFormState: PostFormState | EditPostFormState | PublishPostFormState,
};

const initialValue: ContextType = {
    messages: initialFormStateValue,
    setMessages: () => {},
    initialFormState: initialFormStateValue
};

const Context = createContext<ContextType>(initialValue);

export default function ErrorMessagesContext({
    children,
    initialFormState
}: {
    children: React.ReactNode,
    initialFormState: PostFormState | EditPostFormState | PublishPostFormState,
}) {

    const [messages, setMessages] = useState<PostFormState | EditPostFormState | PublishPostFormState>(initialFormState);

    return (
        <Context.Provider value={{
            messages,
            setMessages,
            initialFormState,
        }}>
            {children}
        </Context.Provider >
    );
}

export const useErrorMessages = () => useContext<ContextType>(Context);
