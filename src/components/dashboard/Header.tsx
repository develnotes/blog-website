import { auth, Session } from "@/auth";
import { HeaderWidget } from "./Account";
import { ShowSideMenu } from "./ShowSideMenu";

export const Header = async () => {

    const session = await auth();

    const { user } = session as Session;

    return (
        <header className="header">

            <ShowSideMenu />

            {
                user &&
                <HeaderWidget user={user} />
            }

        </header>
    );
}