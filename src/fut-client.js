import axios from "axios";
import { HttpsCookieAgent, createCookieAgent } from "http-cookie-agent/http";
import { SocksProxyAgent } from "socks-proxy-agent";
import { HttpsProxyAgent } from "https-proxy-agent";
import { Cookie, CookieJar } from "tough-cookie";
import { AccessTokenRequest } from "./requests/access-token-request";
import { GetAccessCodeRequest } from "./requests/get-access-code-request";
import { GetPidRequest } from "./requests/get-pid-request";
import { Constants } from "./constants";
import { GetAccountInfoRequest } from "./requests/get-account-info-request";
import { Platform } from "./enums/platform";
import { FutException } from "./exceptions/fut-exception";
import { AuthenticateUtasRequest } from "./requests/authenticate-utas-request";
import { GetUserInfoRequest } from "./requests/get-user-info-request";
import { SearchMarketRequest } from "./requests/search-market-request";
import { MoveItemRequest } from "./requests/move-item-request";
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
import { LogoutRequest } from "./requests/logout-request";
import { StartClubRequest } from "./requests/start-club-request";
import { SearchClubRequest } from "./requests/search-club-request";
import { UpdateStadiumRequest } from "./requests/update-stadium-request";
import { AutoClaimObjetivesRequest } from "./requests/auto-claim-objectives.request";
import { AppStatsRequest } from "./requests/appstats-request";
import { GetPendingItemsRequest } from "./requests/get-pending-items-request";
import { GetSbcRequest } from "./requests/get-sbc-request";
import { GetSbcSetRequest } from "./requests/get-sbc-sets-request";
import { GetSbcSetSquadRequest } from "./requests/get-sbc-set-squad-request";
import { UpdateSbcSetSquadRequest } from "./requests/update-sbc-set-squad-request";
import { SubmitSbcSetRequest } from "./requests/submit-sbc-set-request";
import { GetChemistryProfileRequest } from "./requests/get-chemistry-profile-request";
import { StartSbcSetRequest } from "./requests/start-sbc-set-request";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
export class FutClient {
  jsEngine;
  httpClient;
  cookieJar;
  sid;
  constructor(sid, rememberCookie, proxy, jsEngine) {
    this.jsEngine = jsEngine;
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
    const SocksProxyCookiesAgent = createCookieAgent(SocksProxyAgent);
    const HttpsProxyCookiesAgent = createCookieAgent(HttpsProxyAgent);
    const proxyUrl = proxy
      ? `${proxy.protocol}://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`
      : "";
    this.httpClient = axios.create({
      proxy: false,
      timeout: 60_000,
      headers: {
        Accept: "*/*",
        Connection: "keep-alive",
        "User-Agent": Constants.WebUserAgent,
        "Accept-Language": "pt-PT,pt;q=0.9",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "X-Ut-Sid": sid ?? undefined,
        Origin: "https://www.ea.com",
        Referer: "https://www.ea.com",
      },
      httpsAgent: !proxy
        ? new HttpsCookieAgent({ cookies: { jar: this.cookieJar } })
        : proxy.protocol === "socks"
        ? new SocksProxyCookiesAgent(proxyUrl, {
            timeout: 60_000,
            //@ts-ignore
            rejectUnauthorized: false,
            cookies: { jar: this.cookieJar },
          })
        : new HttpsProxyCookiesAgent(proxyUrl, {
            timeout: 60_000,
            rejectUnauthorized: false,
            //@ts-ignore
            cookies: { jar: this.cookieJar },
          }),
    });
  }
  async getAccessToken(parameters) {
    const accessTokenRequest = new AccessTokenRequest(parameters);
    return await accessTokenRequest.performWithHandling(this.httpClient);
  }
  async getAccessCode(accessToken, sequence) {
    const accessCodeRequest = new GetAccessCodeRequest(accessToken, sequence);
    return await accessCodeRequest.performWithHandling(this.httpClient);
  }
  async sendAnalytics(nucleusId, personaId, sid, jsEngine) {
    return await new AppStatsRequest(nucleusId, personaId, sid, jsEngine).performWithHandling(
      this.httpClient
    );
  }
  async getUtas(parameters) {
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
  async getAccountInfo(accessCode, pidId, sku) {
    return await new GetAccountInfoRequest(accessCode, pidId, sku).performWithHandling(
      this.httpClient
    );
  }
  async getSelectedPersona(accessToken, sku, platform) {
    const pidRequest = new GetPidRequest(accessToken);
    const pidResponse = await pidRequest.performWithHandling(this.httpClient);
    const accessCode = await this.getAccessCode(accessToken, "shard5");
    const accountInfo = await this.getAccountInfo(accessCode.code, pidResponse.pid.pidId, sku);
    const namespace =
      platform === Platform.Pc ? "cem_ea_id,pc" : platform === Platform.Xbox ? "360" : "ps3";
    const persona =
      accountInfo.userAccountInfo.personas.find(
        (p) =>
          p.userClubList.find((club) => club.year === "2024") &&
          p.userClubList.find((club) => namespace.includes(club.platform))
      ) ??
      accountInfo.userAccountInfo.personas.find(
        (p) =>
          p.userClubList.find((club) => club.year === "2023") &&
          p.userClubList.find((club) => namespace.includes(club.platform))
      );
    if (!persona) {
      throw new FutException("wrongPlatform");
    }
    const club =
      persona.userClubList.find((club) => club.year === "2024") ??
      persona.userClubList.find((club) => club.year === "2023");
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
  async logout() {
    return await new LogoutRequest().performWithHandling(this.httpClient);
  }
  async sendCodeToEmail(parameters) {
    const accessTokenRequest = new AccessTokenRequest(parameters);
    return accessTokenRequest.performWithHandling(this.httpClient);
  }
  async claimAllObjectives() {
    return await new AutoClaimObjetivesRequest().performWithHandling(this.httpClient);
  }
  async startClub() {
    return await new StartClubRequest().performWithHandling(this.httpClient);
  }
  async searchMarket(parameters) {
    return await new SearchMarketRequest(parameters).performWithHandling(this.httpClient);
  }
  async searchClub(parameters) {
    return await new SearchClubRequest(parameters).performWithHandling(this.httpClient);
  }
  async getPendingItems() {
    return await new GetPendingItemsRequest().performWithHandling(this.httpClient);
  }
  async updateStadium(tiers) {
    return await new UpdateStadiumRequest(tiers).performWithHandling(this.httpClient);
  }
  async getUserMassInfo() {
    return await new GetUserInfoRequest().performWithHandling(this.httpClient);
  }
  async getTradepile() {
    return await new GetTradePileRequest().performWithHandling(this.httpClient);
  }
  async getUnassigned() {
    return await new GetUnassignedPileRequest().performWithHandling(this.httpClient);
  }
  async bidAuction(tradeId, bid) {
    return await new BidItemRequest(tradeId, bid).performWithHandling(this.httpClient);
  }
  async clearAuction(tradeId) {
    return await new ClearAuctionRequest(tradeId).performWithHandling(this.httpClient);
  }
  async moveItem(itemId, pile) {
    return await new MoveItemRequest(itemId, pile).performWithHandling(this.httpClient);
  }
  async listItem(parameters) {
    return await new ListItemRequest(parameters).performWithHandling(this.httpClient);
  }
  async quickSellItem(itemId) {
    return await new QuickSellItemRequest(itemId).performWithHandling(this.httpClient);
  }
  async redeemItem(itemId) {
    return await new RedeemItemRequest(itemId).performWithHandling(this.httpClient);
  }
  async selectItem(resourceId) {
    return await new SelectItemRequest(resourceId).performWithHandling(this.httpClient);
  }
  async getPacks() {
    return await new GetPacksRequest().performWithHandling(this.httpClient);
  }
  async previewPack(packId) {
    return await new PreviewPackRequest(packId).performWithHandling(this.httpClient);
  }
  async buyPack(packId, untradeable, coins) {
    return await new BuyPackRequest(packId, untradeable, coins).performWithHandling(
      this.httpClient
    );
  }
  async getSbcs() {
    return await new GetSbcRequest().performWithHandling(this.httpClient);
  }
  async getSbcChallenges(sbcId) {
    return await new GetSbcSetRequest(sbcId).performWithHandling(this.httpClient);
  }
  async startSbcChallenge(challengeId) {
    return await new StartSbcSetRequest(challengeId).performWithHandling(this.httpClient);
  }
  async getSbcChallengeSquad(challengeId) {
    return await new GetSbcSetSquadRequest(challengeId).performWithHandling(this.httpClient);
  }
  async updateSbcChallengeSquad(challengeId, squad) {
    return await new UpdateSbcSetSquadRequest(challengeId, squad).performWithHandling(
      this.httpClient
    );
  }
  async submitSbcChallenge(challengeId, chemistryProfileVersion) {
    return await new SubmitSbcSetRequest(challengeId, chemistryProfileVersion).performWithHandling(
      this.httpClient
    );
  }
  async getChemistryProfile() {
    return await new GetChemistryProfileRequest().performWithHandling(this.httpClient);
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
