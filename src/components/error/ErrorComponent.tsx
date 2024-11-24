import type {  Metadata } from "next";

export const metadata: Metadata = {
    title: "Error",
    description: "Error page",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function ErrorComponent({ 
    message,
    reset,
}: {
    message: string,
    reset: () => void
}) {
    return (
        <div className="error">
            <h2 className="error__title">Something went wrong</h2>
            <p className="error__message">{message}</p>

            <button className="button error__button" onClick={() => reset()}>Try again</button>
        </div>
    );
}