"use server";

import { fetchResources, ResourceApiResponse } from "@/cloudinary";
import { cache } from "react";

export type FetchFormState = {
    response: ResourceApiResponse | undefined,
}

export const fetch = cache(async ( formState: FetchFormState ) => {
    
    const response = await fetchResources();

    return { ...formState, response };
});