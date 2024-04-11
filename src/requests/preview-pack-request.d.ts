import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { PreviewPackResponse } from "../responses/preview-pack-response";
export declare class PreviewPackRequest extends BaseRequest<PreviewPackResponse> {
    private packId;
    constructor(packId: number);
    protected perform(httpClient: AxiosInstance): Promise<PreviewPackResponse>;
}
