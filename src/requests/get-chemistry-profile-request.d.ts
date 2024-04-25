import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { GetPacksResponse } from "../responses/get-packs-response";

export declare class GetChemistryProfileRequest extends BaseRequest<GetPacksResponse> {
  protected perform(httpClient: AxiosInstance): Promise<GetPacksResponse>;
}
