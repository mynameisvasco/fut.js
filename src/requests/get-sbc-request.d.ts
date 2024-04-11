import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { GetSbcResponse } from "../responses/get-sbc-response";

export declare class GetSbcRequest extends BaseRequest<GetSbcResponse> {
  constructor();
  protected perform(httpClient: AxiosInstance): Promise<GetSbcResponse>;
}
