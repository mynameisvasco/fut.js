import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { BuyPackResponse } from "../responses/buy-pack-response";

export class BuyPackRequest extends BaseRequest<BuyPackResponse> {
  constructor(private packId: number, private untradeable: boolean, private coins: number) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    let body = {};

    if (this.coins === 0) {
      body = { packId: this.packId, untradeable: this.untradeable, usePreOrder: true };
    } else {
      body = { packId: this.packId, currency: "COINS" };
    }

    const response = await httpClient.post(`${Constants.BaseUrl}/purchased/items`, body, {
      headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
    });

    return response.data as BuyPackResponse;
  }
}
