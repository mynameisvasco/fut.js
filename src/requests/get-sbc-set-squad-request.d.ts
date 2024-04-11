import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { GetSbcSetSquadResponse } from "../responses/get-sbc-set-squad-response";

export declare class GetSbcSetSquadRequest extends BaseRequest<GetSbcSetSquadResponse> {
  challengeId: number;
  constructor(challengeId: number);
  protected perform(httpClient: AxiosInstance): Promise<GetSbcSetSquadResponse>;
}
