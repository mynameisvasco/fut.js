import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class ClearAuctionRequest extends BaseRequest {
    tradeId;
    constructor(tradeId) {
        super();
        this.tradeId = tradeId;
    }
    async perform(httpClient) {
        await httpClient.delete(`${Constants.BaseUrl}/trade/${this.tradeId}`, {
            headers: { Host: Constants.UtasHost },
        });
    }
}
