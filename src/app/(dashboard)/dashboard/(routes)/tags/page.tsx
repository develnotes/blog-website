import { getTags } from "@/actions";
import { Tags } from "@/components/dashboard/tagsPageComponents/Tags";

export default async function TagsPage() {

    const tags = await getTags();

    return (
        <div className="tags-page">
            <Tags tags={tags} />
        </div>
    );
}