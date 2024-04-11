import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
export declare class SelectItemRequest extends BaseRequest<void> {
    private resourceId;
    constructor(resourceId: number);
    protected perform(httpClient: AxiosInstance): Promise<void>;
}
