import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class GetSbcSetRequest extends BaseRequest {
  sbcId;
  constructor(sbcId) {
    super();
    this.sbcId = sbcId;
  }
  async perform(httpClient) {
    const response = await httpClient.get(
      `${Constants.BaseUrl}/sbs/setId/${this.sbcId}/challenges`,
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );
    return response.data;
  }
}
