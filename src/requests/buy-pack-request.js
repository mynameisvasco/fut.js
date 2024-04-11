import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class BuyPackRequest extends BaseRequest {
    packId;
    untradeable;
    coins;
    constructor(packId, untradeable, coins) {
        super();
        this.packId = packId;
        this.untradeable = untradeable;
        this.coins = coins;
    }
    async perform(httpClient) {
        let body = {};
        if (this.coins === 0) {
            body = { packId: this.packId, untradeable: this.untradeable, usePreOrder: true };
        }
        else {
            body = { packId: this.packId, currency: "COINS" };
        }
        const response = await httpClient.post(`${Constants.BaseUrl}/purchased/items`, body, {
            headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
        });
        return response.data;
    }
}
