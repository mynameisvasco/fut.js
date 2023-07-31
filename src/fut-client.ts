import { IFutClient } from "./ifut-client";
import axios, { AxiosInstance } from "axios";
import { HttpCookieAgent, HttpsCookieAgent } from "http-cookie-agent/http";
import { Cookie, CookieJar } from "tough-cookie";
import { LoginParameters } from "./parameters/login-parameters";
import { AccessTokenRequest } from "./requests/access-token-request";
import { GetAccessCodeRequest } from "./requests/get-access-code-request";
import { GetPidRequest } from "./requests/get-pid-request";
import * as crypto from "crypto";
import { Constants } from "./constants";
import { GetAccountInfoRequest } from "./requests/get-account-info-request";
import { Sku } from "./enums/sku";
import { GetAccountInfoResponse } from "./responses/get-account-info-response";
import { Platform } from "./enums/platform";
import { FutException } from "./exceptions/fut-exception";
import puppeteer from "puppeteer";
import { AuthenticateUtasRequest } from "./requests/authenticate-utas-request";
import { AuthenticateUtasParameters } from "./parameters/authenticate-utas-parameters";

export class FutClient implements IFutClient {
  private httpClient: AxiosInstance;
  private cookieJar: CookieJar;

  constructor(rememberCookie?: string, proxy?: any) {
    this.cookieJar = new CookieJar();

    if (rememberCookie) {
      const cookie = new Cookie({
        key: "_nx_mpcid",
        domain: "ea.com",
        path: "/",
        value: rememberCookie,
      });

      this.cookieJar.setCookie(cookie, "https://ea.com");
    }

    this.httpClient = axios.create({
      withCredentials: true,
      headers: {
        "User-Agent": Constants.WebUserAgent,
        "Keep-Alive": "true",
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-PT;q=0.5",
      },
      httpAgent: new HttpCookieAgent({
        cookies: { jar: this.cookieJar },
        keepAlive: true,
      }),
      httpsAgent: new HttpsCookieAgent({
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
        keepAlive: true,
        cookies: { jar: this.cookieJar },
      }),
      proxy,
    });
  }

  async login(parameters: LoginParameters) {
    const accountInfos: GetAccountInfoResponse[] = [];
    const accessTokenRequest = new AccessTokenRequest(parameters);
    const accessToken = await accessTokenRequest.performWithHandling(this.httpClient);
    const pidRequest = new GetPidRequest(accessToken);
    const pidResponse = await pidRequest.performWithHandling(this.httpClient);
    let accessCodeRequest = new GetAccessCodeRequest(accessToken, "shard2");
    let accessCodeResponse = await accessCodeRequest.performWithHandling(this.httpClient);
    let accountInfoRequest = new GetAccountInfoRequest(
      accessCodeResponse.code,
      pidResponse.pid.pidId,
      "s2",
      parameters.sku
    );

    accountInfos.push(await accountInfoRequest.performWithHandling(this.httpClient));
    accessCodeRequest = new GetAccessCodeRequest(accessToken, "shard3");
    accessCodeResponse = await accessCodeRequest.performWithHandling(this.httpClient);
    accountInfoRequest = new GetAccountInfoRequest(
      accessCodeResponse.code,
      pidResponse.pid.pidId,
      "s3",
      parameters.sku
    );

    accountInfos.push(await accountInfoRequest.performWithHandling(this.httpClient));
    accessCodeRequest = new GetAccessCodeRequest(accessToken, "shard5");
    accessCodeResponse = await accessCodeRequest.performWithHandling(this.httpClient);
    accountInfoRequest = new GetAccountInfoRequest(
      accessCodeResponse.code,
      pidResponse.pid.pidId,
      "s5",
      parameters.sku
    );

    accountInfos.push(await accountInfoRequest.performWithHandling(this.httpClient));
    const namespace =
      parameters.platform === Platform.Pc
        ? "cem_ea_id,pc"
        : parameters.platform === Platform.Xbox
        ? "360"
        : "ps3";

    const persona = accountInfos
      .filter((i) => i.userAccountInfo)
      .map((i) => i.userAccountInfo)
      .flatMap((i) => i.personas)
      .find(
        (p) =>
          p.userClubList.find((club: any) => club.year === "2023") &&
          p.userClubList.find((club: any) => namespace.includes(club.platform))
      );

    if (!persona) {
      throw new FutException("WrongPlatform");
    }

    const club = persona.userClubList.pop()!;
    const clubGameSku = Object.keys(club.skuAccessList).reduce((a, b) =>
      club.skuAccessList[a] > club.skuAccessList[b] ? a : b
    );

    accessCodeRequest = new GetAccessCodeRequest(accessToken, "ut-auth");
    accessCodeResponse = await accessCodeRequest.performWithHandling(this.httpClient);
    const authenticateUtasRequest = new AuthenticateUtasRequest(
      new AuthenticateUtasParameters(
        persona.personaId,
        parameters.sku,
        clubGameSku,
        accessCodeResponse.code,
        parameters.priority
      )
    );

    return await authenticateUtasRequest.performWithHandling(this.httpClient);
  }

  logout(utas: any) {
    throw new Error("Method not implemented.");
  }

  sendCodeToEmail(parameters: any) {
    throw new Error("Method not implemented.");
  }

  searchMarket(parameters: any, utas: any) {
    throw new Error("Method not implemented.");
  }

  userMassInfo(utas: any) {
    throw new Error("Method not implemented.");
  }

  getTradepile(utas: any) {
    throw new Error("Method not implemented.");
  }

  getUnassigned(utas: any) {
    throw new Error("Method not implemented.");
  }

  bidAuction(auction: any, bid: any, utas: any) {
    throw new Error("Method not implemented.");
  }

  clearAuction(auction: any, utas: any) {
    throw new Error("Method not implemented.");
  }

  moveItemToPile(item: any, pile: any, utas: any) {
    throw new Error("Method not implemented.");
  }

  listItem(item: any, parameters: any, utas: any) {
    throw new Error("Method not implemented.");
  }

  quickSellItem(item: any, utas: any) {
    throw new Error("Method not implemented.");
  }

  redeemItem(item: any, utas: any) {
    throw new Error("Method not implemented.");
  }

  selectItem(resourceId: any, utas: any) {
    throw new Error("Method not implemented.");
  }
  getPacks(utas: any) {
    throw new Error("Method not implemented.");
  }

  previewPack(pack: any, utas: any) {
    throw new Error("Method not implemented.");
  }

  buyPack(pack: any, utas: any) {
    throw new Error("Method not implemented.");
  }

  getRememberCookie() {
    return (
      this.cookieJar.getCookiesSync("https://ea.com").find((c) => c.key === "_nx_mpcid")?.value ??
      ""
    );
  }
}
