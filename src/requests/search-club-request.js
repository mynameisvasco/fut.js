import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class SearchClubRequest extends BaseRequest {
  parameters;
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }
  async perform(httpClient) {
    let body = {
      count: 91,
      searchAltPositions: true,
      sort: "desc",
      sortBy: "value",
      start: this.parameters.page * (21 - 1),
      type: this.parameters.type,
    };

    if (this.parameters.defId) {
      body = {
        count: 91,
        defId: this.parameters.defId,
        searchAltPositions: true,
        sort: "desc",
        sortBy: "value",
        start: this.parameters.page * (21 - 1),
        type: this.parameters.type,
      };
    }

    const response = await httpClient.post(`${Constants.BaseUrl}/club`, body, {
      headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
    });
    return response.data;
  }
}
