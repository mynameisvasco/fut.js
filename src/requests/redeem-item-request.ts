import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { RedeemItemResponse } from "../responses/redeem-item-response";

export class RedeemItemRequest extends BaseRequest<RedeemItemResponse> {
  constructor(private itemId: number) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.post(
      `${Constants.BaseUrl}/item/${this.itemId}`,
      { apply: [] },
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );

    return response.data as RedeemItemResponse;
  }
}
