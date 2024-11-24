"use server";

import { auth } from "@/auth";
import { Account } from "@/components/dashboard/Account";

export default async function AccountPage() {

    const session = await auth();

    if (session && session.user) {
        return (
            <div className="account-page">
                <Account user={session.user} />
            </div>
        );
    }

    return (
        <div className="account-page">
            <div className="account-page__empty">
                No session found.
            </div>
        </div>
    );
}