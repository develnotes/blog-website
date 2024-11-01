"use client";

import { PostFormState } from "@/types";

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
    messages: PostFormState,
    setMessages: Dispatch<SetStateAction<PostFormState>>,
    initialFormState: PostFormState,
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
    initialFormState: PostFormState,
}) {

    const [messages, setMessages] = useState<PostFormState>(initialFormState);

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
