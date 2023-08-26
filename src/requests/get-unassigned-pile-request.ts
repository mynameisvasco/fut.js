import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { GetUnassignedPileResponse } from "../responses/get-unassigned-pile-response";

export class GetUnassignedPileRequest extends BaseRequest<GetUnassignedPileResponse> {
  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.get(`${Constants.BaseUrl}/purchased/items`, {
      headers: { Host: Constants.UtasHost },
    });

    return response.data as GetUnassignedPileResponse;
  }
}
