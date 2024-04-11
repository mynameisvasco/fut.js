import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
export declare class QuickSellItemRequest extends BaseRequest<void> {
    private itemId;
    constructor(itemId: number);
    protected perform(httpClient: AxiosInstance): Promise<void>;
}
