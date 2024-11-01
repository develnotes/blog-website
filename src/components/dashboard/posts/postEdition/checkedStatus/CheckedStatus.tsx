import { IconCheck } from "@tabler/icons-react";

export const CheckedStatus = ({ condition }: { condition?: boolean }) => {
    if (condition) {
        return (
            <IconCheck size={20} color="green" />
        );
    }
};