import { AxiosInstance } from "axios";
import { MoveItemResponse } from "../responses/move-item-response";
import { BaseRequest } from "./base-request";
import { Pile } from "../enums/pile";
import { Constants } from "../constants";
import { FutException } from "../exceptions/fut-exception";

export class MoveItemRequest extends BaseRequest<MoveItemResponse> {
  constructor(private itemId: number, private pile: Pile) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.put(
      `${Constants.BaseUrl}/item`,
      { itemData: [{ id: this.itemId, pile: this.pile }] },
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );

    const data = response.data as MoveItemResponse;

    if (!data.itemData[0]?.success) {
      throw new FutException("destinationFull");
    }

    return data;
  }
}
