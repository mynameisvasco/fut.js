import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class SelectItemRequest extends BaseRequest<void> {
  constructor(private resourceId: number) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    await httpClient.post(`${Constants.BaseUrl}/playerpicks/item/${this.resourceId}/select`, {
      headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
    });
  }
}
