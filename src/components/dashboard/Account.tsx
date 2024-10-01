import { logout } from "@/actions/auth";
import { User } from "@/auth";
import Image from "next/image";

export const Account = ({ user }: { user: User }) => {

    const image = user.image as string;

    return (
        <div className="account">
            <div className="account__avatar">
                <Image
                    src={image}
                    alt="User avatar"
                    fill
                    sizes="300"
                    priority
                    fetchPriority="high"
                />
            </div>

            <div className="account__details">
                <div className="account__details__name">
                    {user.name}
                </div>

                <div className="account__details__email">
                    {user.email}
                </div>
            </div>

            <div className="account__logout">
                <form className="account__logout__form" action={logout}>
                    <button className="account__logout__button" type="submit">Logout</button>
                </form>
            </div>
        </div>
    );
};