"use server";

import { login } from "@/actions/auth";
import { appName } from "@/config";
import { IconBrandGithub, IconBrandGithubFilled } from "@tabler/icons-react";
import loginImage from "./Blog_post-bro.svg";
import Image from "next/image";
import appLogo from "@/images/Blogging-cuate-blue.svg";

export default async function Login() {
    return (
        <div className="login">
            <div className="login__box">
                <AppName />
                <AppLogo />
                <FormButton />
            </div>

            <div className="login__image">
                <Image alt="login image" src={loginImage} fill={true} />
                <Attribution />
            </div>
        </div >
    );
}

const Attribution = () => {
    return (
        <div className="attribution">
            <a href="https://storyset.com/work">Work illustrations by Storyset</a>
        </div>
    );
};

const FormButton = () => {
    return (
        <form className="form" action={login}>
            <button type="submit"
                className="form__button form__button--github">
                <IconBrandGithub className="form__button__icon" size={35} strokeWidth={2} />
                <div className="form__button__text">Sign In with Github</div>
            </button>
        </form>
    );
}

const AppName = () => {
    return (
        <div className="app-name">
            {/* <span className="text-before">Login to</span> */}
            <div className="text-main">
                {appName}
            </div>
            <div className="text-after">dashboard</div>
        </div>
    );
}

const AppLogo = () => {
    return (
        <div className="app-logo">
            <Image alt="app-logo" src={appLogo} fill={true} />
        </div>

        /* <a href="https://storyset.com/user">User illustrations by Storyset</a> */
    );
};

/* https://storyset.com/illustration/blogging/cuate#483D8BFF&hide=Plant,Pen,Character,speech-bubble&hide=complete */