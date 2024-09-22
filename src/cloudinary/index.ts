"use server";

const folder = "develnotes-blog";

import { v2 as cloudinary } from "cloudinary";
export type { ResourceApiResponse, UploadApiResponse } from "cloudinary";

export async function saveImage(image: string) {
    const response = await cloudinary.uploader.upload(image, { 
        folder,
    });

    return response;
}

export async function saveArrayBuffer(buffer: Buffer) {
    new Promise((resolve) => {
        cloudinary.uploader.upload_stream({
            folder,
        }, (error, uploadResult) => {
            return resolve(uploadResult);
        })
            .end(buffer);
    })
        .then((uploadResult) => {
            console.log(uploadResult);
        })
        .catch((error) => console.log(error));
}

export async function fetchImages() {
    const response = await cloudinary.api.resources_by_asset_folder("develnotes-blog", { resource_type: "images" });
    return response;
}

export async function deleteImage(id: string) {
    const response  = await cloudinary.api.delete_resources([id]);
}


