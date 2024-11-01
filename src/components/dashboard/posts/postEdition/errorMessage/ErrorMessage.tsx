import { IconAlertCircle } from "@tabler/icons-react";

export const ErrorMessage = ({ message }: { message: string | undefined }) => {
    if (message) {
        return (
            <div className="form-error-message">
                <IconAlertCircle size={20} />
                <div>{message}</div>
            </div>
        );
    }
};