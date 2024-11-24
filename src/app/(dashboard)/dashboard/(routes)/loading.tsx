import { Loader } from "@/components/dashboard/Loader";

export default function Loading() {
    return (
        <div className="loading-page">
            <Loader loading full />
        </div>
    );
}