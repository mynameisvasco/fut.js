import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { SubmitSbcSetResponse } from "../responses/submit-sbc-set-response";

export declare class SubmitSbcSetRequest extends BaseRequest<SubmitSbcSetResponse> {
  challengeId: number;

  constructor(challengeId: number);
  protected perform(httpClient: AxiosInstance): Promise<SubmitSbcSetResponse>;
}
