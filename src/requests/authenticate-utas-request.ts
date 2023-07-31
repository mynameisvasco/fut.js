import { AxiosInstance } from "axios";
import { AuthenticateUtasResponse } from "../responses/authenticate-utas-response";
import { BaseRequest } from "./base-request";
import { AuthenticateUtasParameters } from "../parameters/authenticate-utas-parameters";
import { Constants } from "../constants";
import { Sku } from "../enums/sku";
import puppeteer from "puppeteer";

export class AuthenticateUtasRequest extends BaseRequest<AuthenticateUtasResponse> {
  constructor(private parameters: AuthenticateUtasParameters) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const body = {
      clientVersion: 1,
      ds: await this.getDs(),
      gameSku: this.parameters.gameSku,
      identification: {
        authCode: this.parameters.accessCode,
        redirectUrl: "nucleus:rest",
        tid: "RETAIL",
      },
      isReadOnly: "false",
      locale: "en-US",
      method: "authcode",
      nucleusPersonaId: this.parameters.personaId,
      priorityLevel: this.parameters.priority,
      sku: Sku[this.parameters.sku as any],
    };

    console.log(body);

    const response = await httpClient.post(`https://${Constants.UtasHost}/ut/auth`, body, {
      headers: {
        Host: Constants.UtasHost,
        "X-UT-PHISHING-TOKEN": "0",
        "Content-Type": "application/json",
      },
    });

    return response.data as AuthenticateUtasResponse;
  }

  private async getDs() {
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_IO_TOKEN}`,
    });

    const page = await browser.newPage();
    await page.goto("https://www.ea.com/fifa/ultimate-team/web-app/");
    await page.waitForSelector(".call-to-action");
    const ds = await page.evaluate((authCode: string) => {
      const authCodeJson = JSON.stringify({ authCode });
      const skuJson = JSON.stringify({ sku: "FUT23WEB" });
      const customJson = (window as any).services.Authentication.getAuthState().split(",")[2];
      const authState = `${authCodeJson}, ${skuJson}, ${customJson}`;

      const first = (window as any).services.Module.get(
        authState,
        (window as any).ModuleEncoding.Utf8,
        (window as any).ModuleEncoding.Hexadecimal,
        0x20,
        0xa
      );
      const second = (window as any).services.Module.get(
        0x0,
        (window as any).ModuleEncoding.Integer,
        (window as any).ModuleEncoding.Utf8,
        0x4,
        0xc0000104
      );
      return first + "/" + second;
    }, this.parameters.accessCode);

    await page.close();
    return ds;
  }
}
