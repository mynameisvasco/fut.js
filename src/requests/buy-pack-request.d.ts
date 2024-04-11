import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { BuyPackResponse } from "../responses/buy-pack-response";
export declare class BuyPackRequest extends BaseRequest<BuyPackResponse> {
    private packId;
    private untradeable;
    private coins;
    constructor(packId: number, untradeable: boolean, coins: number);
    protected perform(httpClient: AxiosInstance): Promise<BuyPackResponse>;
}
