import { ShowPost } from "@/components/dashboard/ShowPost";
import { fetchPost } from "@/db";

export default async function Page({ params }: { params: { slug: string } }) {

    const post = await fetchPost(params.slug);

    return (
        <ShowPost post={post} />
    );
}