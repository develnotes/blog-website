'use client';

import ErrorComponent from "@/components/error/ErrorComponent"

// Error boundaries must be Client Components
//global-error.js is only enabled in production

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<ErrorComponent
			message={error.message}
			reset={reset}
		/>
	);
}