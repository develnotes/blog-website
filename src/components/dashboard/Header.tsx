import { auth, Session } from "@/auth";
import { HeaderWidget } from "./HeaderAccountWidget"; 
import { SideMenuShowWidget } from "./SideMenuShowWidget";

export const Header = async () => {

    const session = await auth();

    const { user } = session as Session;

    return (
        <header className="header">

            <SideMenuShowWidget />

            {
                user &&
                <HeaderWidget user={user} />
            }

        </header>
    );
}