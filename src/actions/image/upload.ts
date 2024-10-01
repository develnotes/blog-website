"use server";

import { uploadResource, UploadApiResponse } from "@/cloudinary";

export type UploadFormState = {
    response: UploadApiResponse | undefined,
}

export async function upload(
    formState: UploadFormState,
    image: string
) {
    const response = await uploadResource(image);

    return { ...formState, response };
}