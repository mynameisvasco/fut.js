import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class GetChemistryProfileRequest extends BaseRequest {
  async perform(httpClient) {
    const response = await httpClient.get(`${Constants.BaseUrl}/chemistry/profiles`, {
      headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
    });
    return response.data;
  }
}
