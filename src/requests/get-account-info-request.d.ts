import { BaseRequest } from "./base-request";
import { GetAccountInfoResponse } from "../responses/get-account-info-response";
import { AxiosInstance } from "axios";
import { Sku } from "../enums/sku";
export declare class GetAccountInfoRequest extends BaseRequest<GetAccountInfoResponse> {
    private accessCode;
    private nucleusId;
    private sku;
    constructor(accessCode: string, nucleusId: number, sku: Sku);
    protected perform(httpClient: AxiosInstance): Promise<GetAccountInfoResponse>;
}
