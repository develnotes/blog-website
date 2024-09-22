"use server";

import * as cn from "@/cloudinary";

export async function uploadImage(formData: FormData) {
    const image = formData.get("image") as File;
    const imageBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    cn.saveArrayBuffer(buffer);
}