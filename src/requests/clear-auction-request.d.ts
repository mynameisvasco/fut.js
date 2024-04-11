import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
export declare class ClearAuctionRequest extends BaseRequest<void> {
    private tradeId;
    constructor(tradeId: number);
    protected perform(httpClient: AxiosInstance): Promise<void>;
}
