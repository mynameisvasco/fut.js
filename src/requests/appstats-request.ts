import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { IJSEngine } from "../interfaces/ijsengine";

export class AppStatsRequest extends BaseRequest<void> {
  constructor(
    private nucleusId: number,
    private personaId: number,
    private sid: string,
    private jsEngine?: IJSEngine
  ) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    if (this.jsEngine) {
      await httpClient.post(
        `${Constants.BaseUrl}/appstats`,
        {
          data: await this.jsEngine.getTel(this.sid, this.nucleusId, this.personaId),
          type: "COMPANION",
        },
        { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } }
      );
    }
  }
}
