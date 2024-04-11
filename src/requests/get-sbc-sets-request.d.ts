import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { GetSbcResponse } from "../responses/get-sbc-response";
import { GetSbcSetResponse } from "../responses/get-sbc-set-response";

export declare class GetSbcSetRequest extends BaseRequest<GetSbcSetResponse> {
  private sbcId;
  constructor(sbcId: number);
  protected perform(httpClient: AxiosInstance): Promise<GetSbcSetResponse>;
}
