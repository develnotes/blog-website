import { getTags } from "@/actions";
import { Tags } from "@/components/dashboard/tagsPageComponents/Tags";

export default async function TagsPage() {

    const tags = await getTags();

    if (tags && tags.length > 0) {
        return (
            <div className="tags-page">
                <Tags tags={tags} />
            </div>
        );
    }

    return <div className="tags-page">No tags found</div>;
}