import NextAuth from "next-auth";
import authConfig from "./auth.config";

console.log("middleware");

//export const { auth: middleware } = NextAuth(authConfig);

export const { handlers, auth: middleware } = NextAuth(async (req) => {

    const path = req?.nextUrl.pathname;
    const routes = [
        "/dashboard",
        "/dashboard/write",
        "/dashboard/posts",
        "/dashboard/account",
        "/dashboard/about"
    ];

    if (path && routes.includes(path)) {

        console.log(req?.nextUrl.pathname);
        console.log(req.headers.get("accept-language"));
    }

    return authConfig;
});

/* 
(alias) NextAuth(config: NextAuthConfig | ((request: NextRequest | undefined) => Awaitable<NextAuthConfig>)): NextAuthResult
import NextAuth
Initialize NextAuth.js.

@example

    import NextAuth from "next-auth"
import GitHub from "@auth/core/providers/github"

export const { handlers, auth } = NextAuth({ providers: [GitHub] })
Lazy initialization:

@example

    import NextAuth from "next-auth"
import GitHub from "@auth/core/providers/github"

export const { handlers, auth } = NextAuth(async (req) => {
    console.log(req) // do something with the request
    return {
        providers: [GitHub],
    },
})
 */