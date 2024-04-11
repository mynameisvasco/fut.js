import { AxiosInstance } from "axios";
import { AuthenticateUtasResponse } from "../responses/authenticate-utas-response";
import { BaseRequest } from "./base-request";
import { AuthenticateUtasParameters } from "../parameters/authenticate-utas-parameters";
export declare class AuthenticateUtasRequest extends BaseRequest<AuthenticateUtasResponse> {
    private parameters;
    constructor(parameters: AuthenticateUtasParameters);
    protected perform(httpClient: AxiosInstance): Promise<AuthenticateUtasResponse>;
}
