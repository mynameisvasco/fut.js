import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { FutException } from "../exceptions/fut-exception";
export class MoveItemRequest extends BaseRequest {
  itemId;
  pile;
  constructor(itemId, pile) {
    super();
    this.itemId = itemId;
    this.pile = pile;
  }
  async perform(httpClient) {
    const response = await httpClient.put(
      `${Constants.BaseUrl}/item`,
      { itemData: [{ id: this.itemId, pile: this.pile }] },
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );
    const data = response.data;
    if (!data.itemData[0]?.success) {
      throw new FutException("destinationFull");
    }
    return data;
  }
}
