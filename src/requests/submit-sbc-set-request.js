import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class SubmitSbcSetRequest extends BaseRequest {
  challengeId;
  chemistryProfileVersion;
  constructor(challengeId, chemistryProfileVersion) {
    super();
    this.challengeId = challengeId;
    this.chemistryProfileVersion = chemistryProfileVersion;
  }
  async perform(httpClient) {
    const response = await httpClient.put(
      `${Constants.BaseUrl}/sbs/challenge/${this.challengeId}?skipUserSquadValidation=true&chemistryProfilesVersion=${this.chemistryProfileVersion}`,
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );

    return response.data;
  }
}
