import { AxiosInstance } from "axios";
import { GetUserInfoResponse } from "../responses/get-user-info-response";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class GetUserInfoRequest extends BaseRequest<GetUserInfoResponse> {
  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.get(`${Constants.BaseUrl}/usermassinfo`, {
      headers: { Host: Constants.UtasHost },
    });

    return response.data as GetUserInfoResponse;
  }
}
