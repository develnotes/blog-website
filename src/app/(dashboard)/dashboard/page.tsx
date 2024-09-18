import { appName } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata =  {
    title: `${appName} dashboard | Home`
}

export default function Dashboard() {
    return (
        <div className="dashboard-home"></div>
    );
}