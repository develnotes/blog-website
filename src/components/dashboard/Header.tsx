import { auth, Session } from "@/auth";
import { HeaderAccountWidget } from "./HeaderAccountWidget"; 
import { HeaderMenuWidget } from "./HeaderMenuWidget";
import { HeaderThemeWidget } from "./HeaderThemeWidget";

export const Header = async () => {

    const session = await auth();

    const { user } = session as Session;

    return (
        <header className="header">

            <HeaderMenuWidget />

            <HeaderThemeWidget />

            {
                user &&
                <HeaderAccountWidget user={user} />
            }

        </header>
    );
}