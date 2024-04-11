import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { GetUnassignedPileResponse } from "../responses/get-unassigned-pile-response";
export declare class GetUnassignedPileRequest extends BaseRequest<GetUnassignedPileResponse> {
    protected perform(httpClient: AxiosInstance): Promise<GetUnassignedPileResponse>;
}
