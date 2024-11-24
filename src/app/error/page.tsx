"use client";

import { Loader } from "@/components/dashboard/Loader";
/*  Refer to:
    https://authjs.dev/guides/pages/error

    Query Param	Example URL	Description

    Configuration	/auth/error?error=Configuration	    There is a problem with the server configuration. Check if your options are correct.
    AccessDenied	/auth/error?error=AccessDenied	    Usually occurs, when you restricted access through the signIn callback, or redirect callback.
    Verification	/auth/error?error=Verification	    Related to the Email provider. The token has expired or has already been used.
    Default	        /auth/error?error=Default	        Catch all, will apply, if none of the above matched.
*/
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

enum Error {
    Configuration = "Configuration",
    AccessDenied = "AccessDenied",
    Verification = "Verification",
    Default = "Default",
};

const errorMap = {
    [Error.Configuration]: (
        <>
            <p>There was a problem when trying to authenticate.</p>
            <p>Please contact us if this error persists.</p >
            <p>Unique error code: <code> Configuration</code></p>
        </>
    ),
    [Error.AccessDenied]: (
        <>
            <p>Access Denied</p>
            <p>Please contact us if this error persists.</p >
            <p>Unique error code: <code> AccessDenied</code></p>
        </>
    ),
    [Error.Verification]: (
        <>
            <p>Verification</p>
            <p>Please contact us if this error persists.</p >
            <p>Unique error code: <code> Verification</code></p>
        </>
    ),
    [Error.Default]: (
        <>
            <p>An error ocurred</p>
            <p>Please contact us if this error persists.</p >
            <p>Unique error code: <code> Default</code></p>
        </>
    ),
};

export default function AuthErrorPage({ }) {

    return (
        <Suspense fallback={<Loader loading />}>
            <ErrorPageComponent />
        </Suspense>
    );
    
}

const ErrorPageComponent = () => {
    const search = useSearchParams();
    const error = search.get("error") as Error;

    return (
        <div className="auth-error-page">
            <h1 className="auth-error-page__title">An error ocurred</h1>

            <div className="auth-error-page__message">{errorMap[error] || "Please contact us if this error persists."}</div>
        </div>
    );
}