import { Icon, IconHome, IconInfoCircle, IconNews, IconProps, IconTextPlus, IconUserCheck } from "@tabler/icons-react";

export const appName = "DevelNotes";
export const appLogo = "DN";

export type MenuIcon = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>

export const paths = {

    dashboard: {
        home() {
            return "/dashboard";
        },
        write() {
            return "/dashboard/write";
        },
        posts() {
            return "/dashboard/posts";
        },
        post(slug: string) {
            return `/dashboard/posts/${slug}`;
        },
        editPost(slug: string) {
            return `/dashboard/posts/${slug}/edit`;
        },
        account() {
            return `/dashboard/account`;
        },
        about() {
            return `/dashboard/about`;
        }
    },

    blog: {
        home() {
            return "/";
        },
        posts() {
            return "/posts";
        },
        about() {
            return "/about";
        },
    },

    auth: {
        login() {
            return "/auth/login";
        },
    },
};

export const menuItems = [
    {
        path: "/",
        href: paths.dashboard.home(),
        Icon: IconHome,
        label: "Home",
        id: 0,
    },
    {
        path: "/write",
        href: paths.dashboard.write(),
        Icon: IconTextPlus,
        label: "Write",
        id: 1,
    },
    {
        path: "/posts",
        href: paths.dashboard.posts(),
        Icon: IconNews,
        label: "Posts",
        id: 2,
    },
    {
        path: "/account",
        href: paths.dashboard.account(),
        Icon: IconUserCheck,
        label: "Account",
        id: 3,
    },
    {
        path: "/about",
        href: paths.dashboard.about(),
        Icon: IconInfoCircle,
        label: "About",
        id: 4,
    }
];
