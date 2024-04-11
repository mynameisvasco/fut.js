import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class RedeemItemRequest extends BaseRequest {
    itemId;
    constructor(itemId) {
        super();
        this.itemId = itemId;
    }
    async perform(httpClient) {
        const response = await httpClient.post(`${Constants.BaseUrl}/item/${this.itemId}`, { apply: [] }, { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } });
        return response.data;
    }
}
