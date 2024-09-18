"use server";

import { v2 as cloudinary } from "cloudinary";
export type { ResourceApiResponse, UploadApiResponse } from "cloudinary";
  
export async function saveImage(image: string) {
    console.log(image);

    const response = await cloudinary.uploader.upload(image, {
        folder: "develnotes-blog",
        
    });

    return response;
}


export async function fetchImages() {

    const response = await cloudinary.api.resources_by_asset_folder("develnotes-blog", { resource_type: "images" });
    return response;
}


