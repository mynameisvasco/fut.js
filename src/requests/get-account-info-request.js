import { BaseRequest } from "./base-request";
import { Sku } from "../enums/sku";
import { Constants } from "../constants";
export class GetAccountInfoRequest extends BaseRequest {
  accessCode;
  nucleusId;
  sku;
  constructor(accessCode, nucleusId, sku) {
    super();
    this.accessCode = accessCode;
    this.nucleusId = nucleusId;
    this.sku = sku;
  }
  async perform(httpClient) {
    const query = `?filterConsoleLogin=true&sku=${Sku[this.sku]}&returningUserGameYear=${
      Constants.PreviousYearFull
    }&clientVersion=1`;
    const response = await httpClient.get(
      `https://${Constants.UtasHost}/ut/game/fc25/v2/user/accountinfo${query}`,
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
    return response.data;
  }
}
