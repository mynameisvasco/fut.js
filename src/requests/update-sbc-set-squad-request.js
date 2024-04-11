import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class UpdateSbcSetSquadRequest extends BaseRequest {
  challengeId;
  squad;
  constructor(challengeId, squad) {
    super();
    this.challengeId = challengeId;
    this.squad = squad;
  }
  async perform(httpClient) {
    const payload = new Array(23);
    for (let i = 0; i < 23; i++) {
      const squadItem = this.squad.find((s) => s.index === i);

      if (squadItem) {
        payload[i] = { index: squadItem.index, itemData: { id: squadItem.itemId, dream: false } };
      } else {
        payload[i] = { index: i, itemData: { id: 0, dream: false } };
      }
    }

    await httpClient.put(
      `${Constants.BaseUrl}/sbs/challenge/${this.challengeId}/squad`,
      { players: payload },
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );
  }
}
