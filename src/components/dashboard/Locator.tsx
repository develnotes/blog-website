"use client"

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export const Locator = () => {

    const segments = useSelectedLayoutSegments();
    const length = segments.length;

    console.log(segments);

    return (
        <div className="locator">
            {
                segments.map((segment, index) => {
                    return (
                        <div key={index} className="locator__locations">
                            {
                                index < length - 1 ?
                                    <div className="locator__locations__location">
                                        <Link href={"/dashboard/" + segments.slice(0, index + 1).join("/")}>
                                            {segment}
                                        </Link>
                                    </div> :
                                    <div className="locator__locations__location">{segment}</div>
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};