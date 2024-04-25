import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";

export declare class StartSbcSetRequest extends BaseRequest<void> {
  challengeId: number;
  constructor(challengeId: number);
  protected perform(httpClient: AxiosInstance): Promise<void>;
}
