import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { GetTradePileResponse } from "../responses/get-trade-pile-response";
export declare class GetTradePileRequest extends BaseRequest<GetTradePileResponse> {
    protected perform(httpClient: AxiosInstance): Promise<GetTradePileResponse>;
}
