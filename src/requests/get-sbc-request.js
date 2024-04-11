import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class GetSbcRequest extends BaseRequest {
  async perform(httpClient) {
    const response = await httpClient.get(`${Constants.BaseUrl}/sbs/sets`, {
      headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
    });
    return response.data;
  }
}
