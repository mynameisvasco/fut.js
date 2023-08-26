import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { GetTradePileResponse } from "../responses/get-trade-pile-response";

export class GetTradePileRequest extends BaseRequest<GetTradePileResponse> {
  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.get(`${Constants.BaseUrl}/tradepile`, {
      headers: { Host: Constants.UtasHost },
    });

    return response.data as GetTradePileResponse;
  }
}
