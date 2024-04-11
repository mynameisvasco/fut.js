import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
export declare class LogoutRequest extends BaseRequest<void> {
    constructor();
    protected perform(httpClient: AxiosInstance): Promise<void>;
}
