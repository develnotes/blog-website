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
    }
}
