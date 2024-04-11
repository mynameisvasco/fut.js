import { AxiosInstance } from "axios";
import { GetUserInfoResponse } from "../responses/get-user-info-response";
import { BaseRequest } from "./base-request";
export declare class GetUserInfoRequest extends BaseRequest<GetUserInfoResponse> {
    protected perform(httpClient: AxiosInstance): Promise<GetUserInfoResponse>;
}
