import axios, { AxiosInstance } from "axios";
import { createCookieAgent } from "http-cookie-agent/http";
import { SocksProxyAgent } from "socks-proxy-agent";
import { Cookie, CookieJar } from "tough-cookie";
import { LoginParameters } from "./parameters/login-parameters";
import { AccessTokenRequest } from "./requests/access-token-request";
import { GetAccessCodeRequest } from "./requests/get-access-code-request";
import { GetPidRequest } from "./requests/get-pid-request";
import { Constants } from "./constants";
import { GetAccountInfoRequest } from "./requests/get-account-info-request";
import { GetAccountInfoResponse } from "./responses/get-account-info-response";
import { Platform } from "./enums/platform";
import { FutException } from "./exceptions/fut-exception";
import { AuthenticateUtasRequest } from "./requests/authenticate-utas-request";
import { GetUserInfoRequest } from "./requests/get-user-info-request";
import * as crypto from "crypto";
import { SearchMarketParamters } from "./parameters/search-market-parameters";
import { SearchMarketRequest } from "./requests/search-market-request";
import { Pile } from "./enums/pile";
import { MoveItemRequest } from "./requests/move-item-request";
import { ListItemParameters } from "./parameters/list-item-parameters";
import { ListItemRequest } from "./requests/list-item-request";
import { GetTradePileRequest } from "./requests/get-trade-pile-request";
import { GetUnassignedPileRequest } from "./requests/get-unassigned-pile-request";
import { ClearAuctionRequest } from "./requests/clear-auction-request";
import { BidItemRequest } from "./requests/bid-item-request";
import { QuickSellItemRequest } from "./requests/quicksell-item-request";
import { RedeemItemRequest } from "./requests/redeem-item-request";
import { SelectItemRequest } from "./requests/select-item-request";
import { BuyPackRequest } from "./requests/buy-pack-request";
import { PreviewPackRequest } from "./requests/preview-pack-request";
import { GetPacksRequest } from "./requests/get-packs-request";

export class FutClient {
  private httpClient: AxiosInstance;
  private cookieJar: CookieJar;

  constructor(sid?: string, rememberCookie?: string, proxy?: any) {
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

    const SocksProxyCookiesAgent = createCookieAgent(SocksProxyAgent);
    const proxyUrl = `${proxy.protocol}://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`;
    this.httpClient = axios.create({
      proxy: false,
      headers: {
        "User-Agent": Constants.WebUserAgent,
        "Keep-Alive": "true",
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-PT;q=0.5",
        "X-UT-SID": sid ?? null,
      },
      httpAgent: new SocksProxyCookiesAgent(proxyUrl, {
        keepAlive: true,
        timeout: 60000,
        scheduling: "fifo",
        //@ts-ignore
        cookies: { jar: this.cookieJar },
      }),
      httpsAgent: new SocksProxyCookiesAgent(proxyUrl, {
        keepAlive: true,
        timeout: 60000,
        scheduling: "fifo",
        //@ts-ignore
        cookies: { jar: this.cookieJar },
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
      }),
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
    const authenticateUtasRequest = new AuthenticateUtasRequest({
      personaId: persona.personaId,
      sku: parameters.sku,
      gameSku: clubGameSku,
      accessCode: accessCodeResponse.code,
      priority: parameters.priority,
    });

    return await authenticateUtasRequest.performWithHandling(this.httpClient);
  }

  logout() {
    throw new Error("Method not implemented.");
  }

  async sendCodeToEmail(parameters: LoginParameters) {
    const accessTokenRequest = new AccessTokenRequest(parameters);
    await accessTokenRequest.performWithHandling(this.httpClient);
  }

  async searchMarket(parameters: SearchMarketParamters) {
    return new SearchMarketRequest(parameters).performWithHandling(this.httpClient);
  }

  async getUserMassInfo() {
    return new GetUserInfoRequest().performWithHandling(this.httpClient);
  }

  async getTradepile() {
    return new GetTradePileRequest().performWithHandling(this.httpClient);
  }

  async getUnassigned() {
    return new GetUnassignedPileRequest().performWithHandling(this.httpClient);
  }

  async bidAuction(tradeId: number, bid: number) {
    return new BidItemRequest(tradeId, bid).performWithHandling(this.httpClient);
  }

  async clearAuction(tradeId: number) {
    return new ClearAuctionRequest(tradeId).performWithHandling(this.httpClient);
  }

  async moveItem(itemId: number, pile: Pile) {
    return new MoveItemRequest(itemId, pile).performWithHandling(this.httpClient);
  }

  async listItem(parameters: ListItemParameters) {
    return new ListItemRequest(parameters).performWithHandling(this.httpClient);
  }

  async quickSellItem(itemId: number) {
    return new QuickSellItemRequest(itemId).performWithHandling(this.httpClient);
  }

  async redeemItem(itemId: number) {
    return new RedeemItemRequest(itemId).performWithHandling(this.httpClient);
  }

  async selectItem(resourceId: number) {
    return new SelectItemRequest(resourceId).performWithHandling(this.httpClient);
  }

  async getPacks() {
    return new GetPacksRequest().performWithHandling(this.httpClient);
  }

  async previewPack(packId: number) {
    return new PreviewPackRequest(packId).performWithHandling(this.httpClient);
  }

  async buyPack(packId: number, untradeable: boolean, coins: number) {
    return new BuyPackRequest(packId, untradeable, coins).performWithHandling(this.httpClient);
  }

  getRememberCookie() {
    return (
      this.cookieJar.getCookiesSync("https://ea.com").find((c) => c.key === "_nx_mpcid")?.value ??
      ""
    );
  }
}
