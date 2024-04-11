import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { RedeemItemResponse } from "../responses/redeem-item-response";
export declare class RedeemItemRequest extends BaseRequest<RedeemItemResponse> {
    private itemId;
    constructor(itemId: number);
    protected perform(httpClient: AxiosInstance): Promise<RedeemItemResponse>;
}
