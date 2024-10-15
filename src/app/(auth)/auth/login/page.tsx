"use server";

import { login } from "@/actions/auth";
import { appName } from "@/config";
import { IconBrandGithub, IconBrandGithubFilled } from "@tabler/icons-react";

export default async function Login() {
    return (
        <div className="login">

            <div className="login__box">
                <div className="app-name">
                    {/* <span className="text-before">Login to</span> */}
                    <div className="text-main">
                        {appName}
                    </div>
                    <div className="text-after">dashboard</div>
                </div>
                <form action={login}>
                    <button type="submit"
                        className="login__button login__button--github">
                        <IconBrandGithub className="login__button__icon" size={35} strokeWidth={2} />
                        <div className="login__button__text">Sign In with Github</div>
                    </button>
                </form>
            </div>
        </div >
    );
}