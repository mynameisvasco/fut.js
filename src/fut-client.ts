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
import { Platform } from "./enums/platform";
import { FutException } from "./exceptions/fut-exception";
import { AuthenticateUtasRequest } from "./requests/authenticate-utas-request";
import { GetUserInfoRequest } from "./requests/get-user-info-request";
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
import { mapException } from "./models/exception-mapper";
import { IJSEngine } from "./interfaces/ijsengine";
import { AuthenticateUtasParameters } from "./parameters/authenticate-utas-parameters";
import { Sku } from "./enums/sku";
import { LogoutRequest } from "./requests/logout-request";
import { StartClubRequest } from "./requests/start-club-request";
import { SearchClubParamters } from "./parameters/search-club-parameters";
import { SearchClubRequest } from "./requests/search-club-request";
import { StadiumTier } from "./enums/stadium-tier";
import { UpdateStadiumRequest } from "./requests/update-stadium-request";
import { AutoClaimObjetivesRequest } from "./requests/auto-claim-objectives.request";
import { AppStatsRequest } from "./requests/appstats-request";

export class FutClient {
  private httpClient: AxiosInstance;
  private cookieJar: CookieJar;
  private sid: string | undefined;

  constructor(sid?: string, rememberCookie?: string, proxy?: any, private jsEngine?: IJSEngine) {
    this.sid = sid;
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

    try {
      const SocksProxyCookiesAgent = createCookieAgent(SocksProxyAgent);
      const proxyUrl = proxy
        ? `${proxy.protocol}://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`
        : null;

      this.httpClient = axios.create({
        proxy: false,
        headers: {
          Connection: "keep-alive",
          "User-Agent": Constants.WebUserAgent,
          "Accept-Language": "pt-PT;q=0.5",
          "X-Ut-Sid": sid ?? undefined,
          Origin: "https://www.ea.com",
          Referer: "https://www.ea.com",
        },
        httpAgent: proxy
          ? new SocksProxyCookiesAgent(proxyUrl!, {
              timeout: 60000,
              //@ts-ignore
              cookies: { jar: this.cookieJar },
            })
          : null,
        httpsAgent: proxy
          ? new SocksProxyCookiesAgent(proxyUrl!, {
              timeout: 60000,
              //@ts-ignore
              cookies: { jar: this.cookieJar },
            })
          : null,
      });
    } catch (e: any) {
      throw mapException(0, e.message);
    }
  }

  async getAccessToken(parameters: LoginParameters) {
    const accessTokenRequest = new AccessTokenRequest(parameters);
    return await accessTokenRequest.performWithHandling(this.httpClient);
  }

  async getAccessCode(accessToken: string, sequence: string) {
    const accessCodeRequest = new GetAccessCodeRequest(accessToken, sequence);
    return await accessCodeRequest.performWithHandling(this.httpClient);
  }

  async sendAnalytics(nucleusId: number, personaId: number, sid: string, jsEngine?: IJSEngine) {
    return new AppStatsRequest(nucleusId, personaId, sid, jsEngine).performWithHandling(
      this.httpClient
    );
  }

  async getUtas(parameters: AuthenticateUtasParameters) {
    const authenticateUtasRequest = new AuthenticateUtasRequest({
      personaId: parameters.personaId,
      sku: parameters.sku,
      gameSku: parameters.gameSku,
      accessCode: parameters.accessCode,
      priority: parameters.priority,
      jsEngine: this.jsEngine,
    });

    return await authenticateUtasRequest.performWithHandling(this.httpClient);
  }

  async getSelectedPersona(accessToken: string, sku: Sku, platform: Platform) {
    const pidRequest = new GetPidRequest(accessToken);
    const pidResponse = await pidRequest.performWithHandling(this.httpClient);
    const accessCode = await this.getAccessCode(accessToken, "shard5");
    const accountInfo = await new GetAccountInfoRequest(
      accessCode.code,
      pidResponse.pid.pidId,
      sku
    ).performWithHandling(this.httpClient);

    const namespace =
      platform === Platform.Pc ? "cem_ea_id,pc" : platform === Platform.Xbox ? "360" : "ps3";

    const persona = accountInfo.userAccountInfo.personas.find(
      (p) =>
        p.userClubList.find((club) => club.year === "2024" || club.year === "2023") &&
        p.userClubList.find((club) => namespace.includes(club.platform))
    );

    if (!persona) {
      throw new FutException("WrongPlatform");
    }

    const club =
      persona.userClubList.find((club) => club.year === "2024") ??
      persona.userClubList.find((club) => club.year === "2023")!;

    const clubGameSku = Object.keys(club.skuAccessList).reduce((a, b) =>
      club.skuAccessList[a] > club.skuAccessList[b] ? a : b
    );

    return {
      persona,
      clubGameSku: clubGameSku.replace("23", "24"),
      year: club.year,
      pidId: pidResponse.pid.pidId,
    };
  }

  logout() {
    return new LogoutRequest().performWithHandling(this.httpClient);
  }

  sendCodeToEmail(parameters: LoginParameters) {
    const accessTokenRequest = new AccessTokenRequest(parameters);
    return accessTokenRequest.performWithHandling(this.httpClient);
  }

  claimAllObjectives() {
    return new AutoClaimObjetivesRequest().performWithHandling(this.httpClient);
  }

  startClub() {
    return new StartClubRequest().performWithHandling(this.httpClient);
  }

  searchMarket(parameters: SearchMarketParamters) {
    return new SearchMarketRequest(parameters).performWithHandling(this.httpClient);
  }

  searchClub(parameters: SearchClubParamters) {
    return new SearchClubRequest(parameters).performWithHandling(this.httpClient);
  }

  updateStadium(tiers: { tier: StadiumTier; slot: number; itemId: number }[]) {
    return new UpdateStadiumRequest(tiers).performWithHandling(this.httpClient);
  }

  getUserMassInfo() {
    return new GetUserInfoRequest().performWithHandling(this.httpClient);
  }

  getTradepile() {
    return new GetTradePileRequest().performWithHandling(this.httpClient);
  }

  getUnassigned() {
    return new GetUnassignedPileRequest().performWithHandling(this.httpClient);
  }

  bidAuction(tradeId: number, bid: number) {
    return new BidItemRequest(tradeId, bid).performWithHandling(this.httpClient);
  }

  clearAuction(tradeId: number) {
    return new ClearAuctionRequest(tradeId).performWithHandling(this.httpClient);
  }

  moveItem(itemId: number, pile: Pile) {
    return new MoveItemRequest(itemId, pile).performWithHandling(this.httpClient);
  }

  listItem(parameters: ListItemParameters) {
    return new ListItemRequest(parameters).performWithHandling(this.httpClient);
  }

  quickSellItem(itemId: number) {
    return new QuickSellItemRequest(itemId).performWithHandling(this.httpClient);
  }

  redeemItem(itemId: number) {
    return new RedeemItemRequest(itemId).performWithHandling(this.httpClient);
  }

  selectItem(resourceId: number) {
    return new SelectItemRequest(resourceId).performWithHandling(this.httpClient);
  }

  getPacks() {
    return new GetPacksRequest().performWithHandling(this.httpClient);
  }

  previewPack(packId: number) {
    return new PreviewPackRequest(packId).performWithHandling(this.httpClient);
  }

  buyPack(packId: number, untradeable: boolean, coins: number) {
    return new BuyPackRequest(packId, untradeable, coins).performWithHandling(this.httpClient);
  }

  getRememberCookie() {
    return (
      this.cookieJar.getCookiesSync("https://ea.com").find((c) => c.key === "_nx_mpcid")?.value ??
      ""
    );
  }

  getSid() {
    return this.sid;
  }
}
