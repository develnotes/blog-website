import { CreatePost } from "@/components/dashboard/CreatePost";

export default function Write() {

    return (
        <div className="write-page">
            Write a post

            <CreatePost
                theme="snow"
                placeholder="New post"
            />
        </div>
    );
}