import { PostsList } from "@/components/blog/PostsList";
import { getAllPosts } from "@/data";
//import { PostExtended } from "@/types"; /* For "no posts" simulation purpose */


export default async function Home() {

	const posts = await getAllPosts();
	//const posts: PostExtended[] = []; /* For "no posts" simulation purpose */

	if (posts && posts.length === 0) {
		return (
			<div className="blog-homepage">
				<h1>This blog have no posts yet.</h1>
			</div>
		);
	}

	const publishedPosts = posts; //posts.filter(post => post.published);

	return (
		<div className="blog-homepage">
			<PostsList posts={publishedPosts} />
		</div>
	);
}
