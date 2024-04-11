import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
export declare class AutoClaimObjetivesRequest extends BaseRequest<any> {
    constructor();
    protected perform(httpClient: AxiosInstance): Promise<any>;
}
