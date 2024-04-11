import { AxiosInstance } from "axios";
import { MoveItemResponse } from "../responses/move-item-response";
import { BaseRequest } from "./base-request";
import { Pile } from "../enums/pile";
export declare class MoveItemRequest extends BaseRequest<MoveItemResponse> {
    private itemId;
    private pile;
    constructor(itemId: number, pile: Pile);
    protected perform(httpClient: AxiosInstance): Promise<MoveItemResponse>;
}
