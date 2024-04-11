import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";

export declare class UpdateSbcSetSquadRequest extends BaseRequest<void> {
  challengeId: number;
  squad: { index: number; itemId: number }[];

  constructor(challengeId: number, squad: { index: number; itemId: number }[]);
  protected perform(httpClient: AxiosInstance): Promise<void>;
}
