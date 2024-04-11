import { AxiosInstance } from "axios";
import { GetPidResponse } from "../responses/get-pid-response";
import { BaseRequest } from "./base-request";
export declare class GetPidRequest extends BaseRequest<GetPidResponse> {
    private accessToken;
    constructor(accessToken: string);
    protected perform(httpClient: AxiosInstance): Promise<GetPidResponse>;
}
