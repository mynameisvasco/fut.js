import { AxiosInstance } from "axios";
import { AuthenticateUtasResponse } from "../responses/authenticate-utas-response";
import { BaseRequest } from "./base-request";
import { AuthenticateUtasParameters } from "../parameters/authenticate-utas-parameters";
import { Constants } from "../constants";
import { Sku } from "../enums/sku";

export class AuthenticateUtasRequest extends BaseRequest<AuthenticateUtasResponse> {
  constructor(private parameters: AuthenticateUtasParameters) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const body = {
      clientVersion: 1,
      ds: this.parameters.jsEngine
        ? await this.parameters.jsEngine.getDs(this.parameters.accessCode)
        : "",
      gameSku: this.parameters.gameSku,
      identification: {
        authCode: this.parameters.accessCode,
        redirectUrl: "nucleus:rest",
        tid: "RETAIL",
      },
      isReadOnly: false,
      locale: "en-US",
      method: "authcode",
      nucleusPersonaId: this.parameters.personaId,
      priorityLevel: this.parameters.priority,
      sku: Sku[this.parameters.sku as any],
    };

    const response = await httpClient.post(`https://${Constants.UtasHost}/ut/auth`, body, {
      headers: {
        Host: Constants.UtasHost,
        "X-Ut-Phishing-Token": "0",
        "Content-Type": "application/json",
        Origin: "https://www.ea.com/",
        Referer: "https://www.ea.com/",
      },
    });

    return response.data as AuthenticateUtasResponse;
  }
}
