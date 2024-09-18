import { Header } from "@/components/dashboard/Header";
import { Locator } from "@/components/dashboard/Locator";

export default function Layout({
    children,
    parallel
}: {
    children: React.ReactNode;
    parallel: React.ReactNode;
}) {
    return (
        <>
            <Locator />
            {children}
            {/* {parallel} */}
        </>
    );
}