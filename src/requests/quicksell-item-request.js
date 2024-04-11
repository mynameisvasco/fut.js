import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class QuickSellItemRequest extends BaseRequest {
    itemId;
    constructor(itemId) {
        super();
        this.itemId = itemId;
    }
    async perform(httpClient) {
        await httpClient.delete(`${Constants.BaseUrl}/item/${this.itemId}`, {
            headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
        });
    }
}
