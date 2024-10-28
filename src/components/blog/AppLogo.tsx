import { appLogo, appName } from "@/config";

export const AppLogo = () => {

    return (
        <div className="app-logo">
            <div className="app-logo__main">{appName}</div>
            <div className="app-logo__sub">Blog</div>
        </div>
    );
};