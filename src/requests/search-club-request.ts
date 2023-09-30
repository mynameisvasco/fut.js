import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { SearchClubResponse } from "../responses/search-club-response";
import { SearchClubParamters } from "../parameters/search-club-parameters";

export class SearchClubRequest extends BaseRequest<SearchClubResponse> {
  constructor(private parameters: SearchClubParamters) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.post(
      `${Constants.BaseUrl}/club`,
      {
        count: 91,
        searchAltPositions: true,
        sort: "desc",
        sortBy: "value",
        start: this.parameters.page * (21 - 1),
        type: this.parameters.type,
      },
      {
        headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
      }
    );

    return response.data as SearchClubResponse;
  }
}
