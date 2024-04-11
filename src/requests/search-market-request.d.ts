import { AxiosInstance } from "axios";
import { SearchMarketResponse } from "../responses/search-market-response";
import { BaseRequest } from "./base-request";
import { SearchMarketParamters } from "../parameters/search-market-parameters";
export declare class SearchMarketRequest extends BaseRequest<SearchMarketResponse> {
    private parameters;
    constructor(parameters: SearchMarketParamters);
    protected perform(httpClient: AxiosInstance): Promise<SearchMarketResponse>;
    getSearchQuery(): string;
}
