import { PostsList } from "@/components/blog/PostsList";
import { getAllPosts } from "@/data";


export default async function Home() {

	const posts = await getAllPosts();

	return (
		<div className="blog-homepage">
			<PostsList posts={posts} />
		</div>
	);
}
