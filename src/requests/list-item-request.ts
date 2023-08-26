import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { ListItemResponse } from "../responses/list-item-response";
import { ListItemParameters } from "../parameters/list-item-parameters";

export class ListItemRequest extends BaseRequest<ListItemResponse> {
  constructor(private paramaters: ListItemParameters) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.post(
      `${Constants.BaseUrl}/auctionhouse`,
      {
        buyNowPrice: this.paramaters.buyNowPrice,
        duration: this.paramaters.duration,
        itemData: { id: this.paramaters.itemId },
        startingBid: this.paramaters.startingBid,
      },
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );

    return response.data as ListItemResponse;
  }
}
