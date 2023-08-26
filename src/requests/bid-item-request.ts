import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { BidItemResponse } from "../responses/bid-item-response";
import { Constants } from "../constants";

export class BidItemRequest extends BaseRequest<BidItemResponse> {
  constructor(private tradeId: number, private bid: number) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.put(
      `${Constants.BaseUrl}/trade/${this.tradeId}/bid`,
      { bid: this.bid },
      {
        headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
        validateStatus: (status: number) => {
          return status === 200 || status === 461 || status === 478;
        },
      }
    );

    if (response.status === 461 || response.status === 478) {
      return { auctionInfo: [], credits: 0, duplicatedItemIdList: [] } as BidItemResponse;
    }

    return response.data as BidItemResponse;
  }
}
