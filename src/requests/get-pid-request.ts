import { AxiosInstance } from "axios";
import { GetPidResponse } from "../responses/get-pid-response";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class GetPidRequest extends BaseRequest<GetPidResponse> {
  constructor(private accessToken: string) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.get("https://gateway.ea.com/proxy/identity/pids/me", {
      headers: {
        Host: Constants.EaGatewayHost,
        Authorization: `Bearer ${this.accessToken}`,
        Accept: "application/json",
      },
    });

    return response.data as GetPidResponse;
  }
}
