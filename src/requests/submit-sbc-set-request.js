import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class SubmitSbcSetRequest extends BaseRequest {
  challengeId;
  constructor(challengeId) {
    super();
    this.challengeId = challengeId;
  }
  async perform(httpClient) {
    const response = await httpClient.put(
      `${Constants.BaseUrl}/sbs/challenge/${this.challengeId}?skipUserSquadValidation=true&chemistryProfilesVersion=16`,
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );

    return response.data;
  }
}
