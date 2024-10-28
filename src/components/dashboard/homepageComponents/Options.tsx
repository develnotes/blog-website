import { paths } from "@/config";
import { IconLibrary, IconUserCog, IconWriting } from "@tabler/icons-react";
import Link from "next/link";

export const Options = () => {

    return (
        <section id="options">
            <div className="options">
                <Link className="link" href={paths.dashboard.write()}>
                    <div className="link-card">
                        <IconWriting />
                        <h3 className="link-title">Write a new post</h3>
                    </div>
                </Link>

                <Link className="link" href={paths.dashboard.account()}>
                    <div className="link-card">
                        <IconUserCog />
                        <h3 className="link-title">Manage Account</h3>
                    </div>
                </Link>

                <Link className="link" href={paths.dashboard.posts()}>
                    <div className="link-card">
                        <IconLibrary />
                        <h3 className="link-title">View all posts</h3>
                    </div>
                </Link>
            </div>
        </section>
    );
};