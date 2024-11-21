import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
    providers: [Github],
    pages: {
        signIn: "/auth/login",
        error: "/error",
    },
    trustHost: true,
    callbacks: {
        authorized: async ({ request, auth }) => {
            if (request.nextUrl.pathname === "/dashboard") {
                if (!auth) {
                    const loginRoute = new URL("/auth/login", request.nextUrl.origin);
                    return Response.redirect(loginRoute);
                }
            }

            if (request.nextUrl.pathname === "/auth/login") {
                if (auth) {
                    const loggedIn = new URL("/dashboard", request.nextUrl.origin);
                    return Response.redirect(loggedIn);
                }
            }

            return true;
        },
    },
} satisfies NextAuthConfig;
