import { BaseRequest } from "./base-request";
import { GetAccountInfoResponse } from "../responses/get-account-info-response";
import axios, { AxiosInstance } from "axios";
import { Sku } from "../enums/sku";
import { Constants } from "../constants";

export class GetAccountInfoRequest extends BaseRequest<GetAccountInfoResponse> {
  constructor(private accessCode: string, private nucleusId: number, private sku: Sku) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const query = `?filterConsoleLogin=true&sku=${Sku[this.sku]}&returningUserGameYear=${
      Constants.PreviousYearFull
    }&clientVersion=1`;

    const response = await httpClient.get(
      `https://${Constants.UtasHost}/ut/game/fc24/v2/user/accountinfo${query}`,
      {
        headers: {
          Host: Constants.UtasHost,
          "Easw-Session-Data-Nucleus-Id": this.nucleusId.toString(),
          "Nucleus-Access-Code": this.accessCode,
          "Nucleus-Redirect-Url": "nucleus:rest",
          Origin: "https://www.ea.com",
          Referer: "https://www.ea.com/",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data as GetAccountInfoResponse;
  }
}
