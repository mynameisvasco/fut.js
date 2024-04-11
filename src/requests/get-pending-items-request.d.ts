import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { GetPendingItemsResponse } from "../responses/get-pending-items-response";
export declare class GetPendingItemsRequest extends BaseRequest<GetPendingItemsResponse> {
    protected perform(httpClient: AxiosInstance): Promise<GetPendingItemsResponse>;
}
