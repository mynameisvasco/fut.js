import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class SubmitSbcSetRequest extends BaseRequest {
  challengeId;
  chemistryProfilesVersion;
  constructor(challengeId, chemistryProfilesVersion) {
    super();
    this.challengeId = challengeId;
    this.chemistryProfilesVersion = chemistryProfilesVersion;
  }
  async perform(httpClient) {
    const response = await httpClient.put(
      `${Constants.BaseUrl}/sbs/challenge/${this.challengeId}?skipUserSquadValidation=true&chemistryProfilesVersion=${chemistryProfilesVersion}`,
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );

    return response.data;
  }
}
