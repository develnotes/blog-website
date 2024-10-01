"use sever";

import { removeResource } from "@/cloudinary";

export async function remove( id: string ) {
    const response = await removeResource(id);
}