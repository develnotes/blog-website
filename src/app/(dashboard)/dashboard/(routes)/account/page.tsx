"use server";

import { auth } from "@/auth";
import { Account } from "@/components/dashboard/Account";

export default async function AccountPage() {

    const session = await auth();

    return (
        <div className="account-page">
            {
                session &&
                session.user &&
                <Account user={session.user} />}
        </div>
    );
}