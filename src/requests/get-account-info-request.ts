import { BaseRequest } from "./base-request";
import { GetAccountInfoResponse } from "../responses/get-account-info-response";
import axios, { AxiosInstance } from "axios";
import { Sku } from "../enums/sku";
import { Constants } from "../constants";

export class GetAccountInfoRequest extends BaseRequest<GetAccountInfoResponse> {
  constructor(
    private accessCode: string,
    private nucleusId: number,
    private shard: string,
    private sku: Sku
  ) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const query = `?filterConsoleLogin=true&sku=${Sku[this.sku]}&returningUserGameYear=${
      Constants.PreviousYearFull
    }&clientVersion=1`;

    try {
      const response = await httpClient.get(
        this.shard === "s5"
          ? `https://${Constants.UtasHost}/ut/game/fifa23/v2/user/accountinfo${query}`
          : `https://utas.external.${this.shard}.fut.ea.com/ut/game/fifa23/v2/user/accountinfo${query}`,
        {
          headers: {
            Host:
              this.shard === "s5" ? Constants.UtasHost : `utas.external.${this.shard}.fut.ea.com`,
            "Easw-Session-Data-Nucleus-Id": this.nucleusId.toString(),
            "Nucleus-Access-Code": this.accessCode,
            "Nucleus-Redirect-Url": "nucleus:rest",
          },
        }
      );
      return response.data as GetAccountInfoResponse;
    } catch (error: any) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }

      if (error.response?.status === 401 || error.response?.status === 465) {
        return {} as GetAccountInfoResponse;
      }

      throw error;
    }
  }
}
