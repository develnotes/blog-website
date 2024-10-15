"use server";

import { paths } from "@/app/paths";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const login = async () => await signIn("github", {
    redirectTo: paths.dashboard.home()
}, [["prompt", "select_account"]]); /* https://docs.github.com/pt/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps */

export const logout = async () => {
    await signOut();

    redirect(paths.auth.login());
};