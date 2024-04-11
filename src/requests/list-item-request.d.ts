import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { ListItemResponse } from "../responses/list-item-response";
import { ListItemParameters } from "../parameters/list-item-parameters";
export declare class ListItemRequest extends BaseRequest<ListItemResponse> {
    private paramaters;
    constructor(paramaters: ListItemParameters);
    protected perform(httpClient: AxiosInstance): Promise<ListItemResponse>;
}
