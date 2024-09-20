"use server";

import { paths } from "@/app/paths";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const login = async () => await signIn("github", { redirectTo: paths.dashboard.home() });

export const logout = async () => {
    await signOut();

    redirect(paths.auth.login());
};