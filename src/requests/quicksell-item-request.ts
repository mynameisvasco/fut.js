import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class QuickSellItemRequest extends BaseRequest<void> {
  constructor(private itemId: number) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    await httpClient.delete(`${Constants.BaseUrl}/item/${this.itemId}`, {
      headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
    });
  }
}
