"use server";

import { uploadResourceAsStream, UploadApiResponse } from "@/cloudinary";

export type UploadStreamFormState = { 
    response: UploadApiResponse | undefined,
}

export async function uploadStream(
    formState: UploadStreamFormState,
    formData: FormData
) {
    const image = formData.get("image") as File;
    const imageBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    const response = await uploadResourceAsStream(buffer);

    return { ...formState, response };
}