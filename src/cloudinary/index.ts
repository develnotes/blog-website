"use server";

const folder = "develnotes-blog";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
export type { ResourceApiResponse, UploadApiResponse } from "cloudinary";


export async function uploadResource(image: string) {
    return await cloudinary.uploader.upload(image, {
        folder,
    });
}

export async function uploadResourceAsStream(buffer: Buffer) {
    try {
        const result = await new Promise((resolve) => {
            cloudinary.uploader.upload_stream({
                folder,
            }, (error, uploadResult) => {
                return resolve(uploadResult);
            })
                .end(buffer);
        });

        console.log("result: ", result);
        return result as UploadApiResponse;

    } catch (error) {
        console.log(error);
    }
}

export async function fetchResources() {
    return await cloudinary.api.resources_by_asset_folder(folder, {
        resource_type: "images"
    });
}

export async function removeResource(id: string) {
    const response = await cloudinary.api.delete_resources([id]);
}


