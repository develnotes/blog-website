import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
    providers: [Github],
    pages: {
        signIn: "/login",
    }
} satisfies NextAuthConfig;