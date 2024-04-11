import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class UpdateStadiumRequest extends BaseRequest {
    tiers;
    constructor(tiers) {
        super();
        this.tiers = tiers;
    }
    async perform(httpClient) {
        await httpClient.post(`${Constants.BaseUrl}/stadium`, {
            tiers: [
                {
                    tier: this.tiers[0].tier,
                    slots: this.tiers.map((t) => ({ slotId: t.slot, itemId: t.itemId })),
                },
            ],
        }, { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } });
    }
}
