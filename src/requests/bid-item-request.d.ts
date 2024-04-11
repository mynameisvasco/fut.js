import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { BidItemResponse } from "../responses/bid-item-response";
export declare class BidItemRequest extends BaseRequest<BidItemResponse> {
    private tradeId;
    private bid;
    constructor(tradeId: number, bid: number);
    protected perform(httpClient: AxiosInstance): Promise<BidItemResponse>;
}
