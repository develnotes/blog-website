"use client";

import ErrorComponent from "@/components/error/ErrorComponent";

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string },
    reset: () => void
}) {
    return (
        <div className="error-page">
            <ErrorComponent
                message={error.message}
                reset={reset}
            />
        </div>
    );
}