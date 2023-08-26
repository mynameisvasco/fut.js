import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class ClearAuctionRequest extends BaseRequest<void> {
  constructor(private tradeId: number) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    await httpClient.delete(`${Constants.BaseUrl}/trade/${this.tradeId}`, {
      headers: { Host: Constants.UtasHost },
    });
  }
}
