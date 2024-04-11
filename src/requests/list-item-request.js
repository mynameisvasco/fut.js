import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class ListItemRequest extends BaseRequest {
    paramaters;
    constructor(paramaters) {
        super();
        this.paramaters = paramaters;
    }
    async perform(httpClient) {
        const response = await httpClient.post(`${Constants.BaseUrl}/auctionhouse`, {
            buyNowPrice: this.paramaters.buyNowPrice,
            duration: this.paramaters.duration,
            itemData: { id: this.paramaters.itemId },
            startingBid: this.paramaters.startingBid,
        }, { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } });
        return response.data;
    }
}
