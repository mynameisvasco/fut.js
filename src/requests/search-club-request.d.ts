import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { SearchClubResponse } from "../responses/search-club-response";
import { SearchClubParamters } from "../parameters/search-club-parameters";
export declare class SearchClubRequest extends BaseRequest<SearchClubResponse> {
    private parameters;
    constructor(parameters: SearchClubParamters);
    protected perform(httpClient: AxiosInstance): Promise<SearchClubResponse>;
}
