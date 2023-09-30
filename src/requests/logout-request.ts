import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class LogoutRequest extends BaseRequest<void> {
  constructor() {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    await httpClient.delete(`https://utas.mob.v2.fut.ea.com/ut/auth`, {
      headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
    });
  }
}
