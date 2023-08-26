import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { GetPacksResponse } from "../responses/get-packs-response";

export class GetPacksRequest extends BaseRequest<GetPacksResponse> {
  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.get(
      `${Constants.BaseUrl}/store/purchaseGroup/all?ppInfo=true&categoryInfo=true`,
      { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
    );

    return response.data as GetPacksResponse;
  }
}
