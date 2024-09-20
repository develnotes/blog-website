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
}
