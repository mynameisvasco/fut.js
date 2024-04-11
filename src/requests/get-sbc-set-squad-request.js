import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class GetSbcSetSquadRequest extends BaseRequest {
  challengeId;
  constructor(challengeId) {
    super();
    this.challengeId = challengeId;
  }
  async perform(httpClient) {
    const response = await httpClient.post(
      `${Constants.BaseUrl}/sbs/challenge/${this.challengeId}`,
      {
        headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
}
