import { auth, Session } from "@/auth";
import { HeaderAccountWidget } from "@/components/dashboard/header/HeaderAccountWidget";
import { HeaderMenuWidget } from "@/components/dashboard/header/HeaderMenuWidget";
import { HeaderThemeWidget } from "@/components/dashboard/header/HeaderThemeWidget";

export const Header = async () => {

    const session = await auth();

    const { user } = session as Session;

    return (
        <header className="header">

            <HeaderMenuWidget />

            <HeaderThemeWidget />

            {
                user ?
                    <HeaderAccountWidget user={user} /> :
                    <div>No session</div>
            }

        </header>
    );
}