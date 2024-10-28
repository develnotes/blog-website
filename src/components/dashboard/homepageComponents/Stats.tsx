import { Posts } from "@/types";

export const Stats = ({ posts }: { posts: Posts | undefined }) => {

    if (posts) {
        const dateRange = posts?.map(post => post.createdAt).sort((a, b) => Number(a) - Number(b)) as Date[];
        const initialDate = new Date(dateRange[0]).toLocaleDateString();
        const finalDate = new Date(dateRange[dateRange.length - 1]).toLocaleDateString();

        return (
            <section id="stats">
                <div className="stats">
                    <h2>{posts?.length} posts from {initialDate} to {finalDate}</h2>
                </div>
            </section>
        );
    }
};