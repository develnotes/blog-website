import { logout } from "@/actions/auth";

export const Logout = () => {

    return (
            <button className="button button-logout"
                onClick={() => logout()}
                type="submit">
                Logout
            </button>
    );
};