import { BaseRequest } from "./base-request";
import { GetAccessCodeResponse } from "../responses/get-access-code-response";
import { AxiosInstance } from "axios";
export declare class GetAccessCodeRequest extends BaseRequest<GetAccessCodeResponse> {
    private accessToken;
    private sequence;
    constructor(accessToken: string, sequence: string);
    protected perform(httpClient: AxiosInstance): Promise<GetAccessCodeResponse>;
}
