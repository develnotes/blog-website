import { Dispatch, SetStateAction } from "react";
import { CheckedStatus } from "../checkedStatus";
import { Label } from "../label";
import { useErrorMessages } from "@/contexts/ErrorMessagesContext";
import { PostHeaderImageSelector } from "./imageSelector";
import { ErrorMessage } from "../errorMessage";

export const ImageEditor = ({
    image,
    setImage
}: {
    image: string,
    setImage: Dispatch<SetStateAction<string>>,
}) => {

    const { messages } = useErrorMessages();

    return (
        <>
            <Label>
                Image
                <CheckedStatus
                    condition={
                        (image.length > 0 && image.startsWith("https")) ||
                        messages.imageMessage === undefined
                    }
                />
            </Label>
            <PostHeaderImageSelector
                image={image}
                setImage={setImage}
            />
            <ErrorMessage message={messages.imageMessage} />
        </>
    );
};