"use server";

import { redirect } from "next/navigation";
import { paths } from "@/config";
import { auth } from "@/auth";

export default async function Authenticate({ children }: { children: React.ReactNode }) {

    const session = await auth();

	if (!session) {
		redirect(paths.auth.login());
	}

    return <>{ children }</>;
}