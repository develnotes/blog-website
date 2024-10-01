import { fetch } from "./fetch";
import { upload } from "./upload";
import { uploadStream } from "./uploadStream";
import { remove } from "./remove"

import type { UploadStreamFormState } from "./uploadStream";
import type { UploadFormState } from "./upload";
import type { FetchFormState } from "./fetch";

export { fetch, upload, uploadStream, remove };

export type {
    FetchFormState,
    UploadFormState,
    UploadStreamFormState,
};