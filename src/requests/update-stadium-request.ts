import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { StadiumTier } from "../enums/stadium-tier";
import { Constants } from "../constants";

export class UpdateStadiumRequest extends BaseRequest<void> {
  constructor(private tiers: { tier: StadiumTier; slot: number; itemId: number }[]) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    await httpClient.post(
      `${Constants.BaseUrl}/stadium`,
      {
        tiers: [
          {
            tier: this.tiers[0].tier,
            slots: this.tiers.map((t) => ({ slotId: t.slot, itemId: t.itemId })),
          },
        ],
      },
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );
  }
}
