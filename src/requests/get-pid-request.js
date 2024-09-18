import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class GetPidRequest extends BaseRequest {
  accessToken;
  constructor(accessToken) {
    super();
    this.accessToken = accessToken;
  }
  async perform(httpClient) {
    const response = await httpClient.get("https://gateway.ea.com/proxy/identity/pids/me", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: "application/json",
        "Content-Type": "text/plain;charset=UTF-8",
        Origin: "https://www.ea.com",
        Referer: "https://www.ea.com/",
      },
    });
    return response.data;
  }
}
