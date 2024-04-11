import { isAxiosError } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class BidItemRequest extends BaseRequest {
    tradeId;
    bid;
    constructor(tradeId, bid) {
        super();
        this.tradeId = tradeId;
        this.bid = bid;
    }
    async perform(httpClient) {
        try {
            const response = await httpClient.put(`${Constants.BaseUrl}/trade/${this.tradeId}/bid`, { bid: this.bid }, {
                headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
                validateStatus: (status) => {
                    return (status === 200 ||
                        status === 461 ||
                        status === 478 ||
                        status === 460 ||
                        status === 429 ||
                        status === 426);
                },
            });
            if (response.status === 461 ||
                response.status === 478 ||
                response.status === 460 ||
                response.status === 429 ||
                response.status === 426) {
                return { auctionInfo: [], credits: 0, duplicatedItemIdList: [] };
            }
            return response.data;
        }
        catch (e) {
            if (!isAxiosError(e))
                throw e;
            if (e.status === 461 ||
                e.status === 478 ||
                e.status === 460 ||
                e.status === 429 ||
                e.status === 426) {
                return { auctionInfo: [], credits: 0, duplicatedItemIdList: [] };
            }
        }
        return { auctionInfo: [], credits: 0, duplicatedItemIdList: [] };
    }
}
