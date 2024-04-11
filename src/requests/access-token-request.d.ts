import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { LoginParameters } from "../parameters/login-parameters";
import { AccessTokenResponse } from "../responses/access-token-response";
export declare class AccessTokenRequest extends BaseRequest<AccessTokenResponse> {
    private loginParameters;
    constructor(loginParameters: LoginParameters);
    protected perform(httpClient: AxiosInstance): Promise<any>;
}
