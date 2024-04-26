import { LoginParameters } from "./parameters/login-parameters";
import { Platform } from "./enums/platform";
import { SearchMarketParamters } from "./parameters/search-market-parameters";
import { Pile } from "./enums/pile";
import { ListItemParameters } from "./parameters/list-item-parameters";
import { IJSEngine } from "./interfaces/ijsengine";
import { AuthenticateUtasParameters } from "./parameters/authenticate-utas-parameters";
import { Sku } from "./enums/sku";
import { SearchClubParamters } from "./parameters/search-club-parameters";
import { StadiumTier } from "./enums/stadium-tier";
export declare class FutClient {
  private jsEngine?;
  private httpClient;
  private cookieJar;
  private sid;
  constructor(sid?: string, rememberCookie?: string, proxy?: any, jsEngine?: IJSEngine | undefined);
  getAccessToken(
    parameters: LoginParameters
  ): Promise<import("./responses/access-token-response").AccessTokenResponse>;
  getAccessCode(
    accessToken: string,
    sequence: string
  ): Promise<import("./responses/get-access-code-response").GetAccessCodeResponse>;
  sendAnalytics(
    nucleusId: number,
    personaId: number,
    sid: string,
    jsEngine?: IJSEngine
  ): Promise<void>;
  getUtas(
    parameters: AuthenticateUtasParameters
  ): Promise<import("./responses/authenticate-utas-response").AuthenticateUtasResponse>;
  getAccountInfo(
    accessCode: string,
    pidId: number,
    sku: Sku
  ): Promise<import("./responses/get-account-info-response").GetAccountInfoResponse>;
  getSelectedPersona(
    accessToken: string,
    sku: Sku,
    platform: Platform
  ): Promise<{
    persona: {
      personaId: number;
      returningUser: number;
      personaName: string;
      userState: string;
      trial: boolean;
      trialFree: boolean;
      onlineAccess: boolean;
      userClubList: {
        year: string;
        platform: string;
        clubAbbr: string;
        clubName: string;
        divisionOnline: number;
        lastAccessTime: number;
        teamId: number;
        established: number;
        assetId: number;
        badgeId: number;
        skuAccessList: {
          [key: string]: number;
        };
      }[];
    };
    clubGameSku: string;
    year: string;
    pidId: number;
  }>;
  logout(): Promise<void>;
  sendCodeToEmail(
    parameters: LoginParameters
  ): Promise<import("./responses/access-token-response").AccessTokenResponse>;
  claimAllObjectives(): Promise<any>;
  startClub(): Promise<import("./responses/start-club-response").StartClubResponse>;
  searchMarket(
    parameters: SearchMarketParamters
  ): Promise<import("./responses/search-market-response").SearchMarketResponse>;
  searchClub(
    parameters: SearchClubParamters
  ): Promise<import("./responses/search-club-response").SearchClubResponse>;
  getPendingItems(): Promise<
    import("./responses/get-pending-items-response").GetPendingItemsResponse
  >;
  updateStadium(
    tiers: {
      tier: StadiumTier;
      slot: number;
      itemId: number;
    }[]
  ): Promise<void>;
  getUserMassInfo(): Promise<import("./responses/get-user-info-response").GetUserInfoResponse>;
  getTradepile(): Promise<import("./responses/get-trade-pile-response").GetTradePileResponse>;
  getUnassigned(): Promise<
    import("./responses/get-unassigned-pile-response").GetUnassignedPileResponse
  >;
  bidAuction(
    tradeId: number,
    bid: number
  ): Promise<import("./responses/bid-item-response").BidItemResponse>;
  clearAuction(tradeId: number): Promise<void>;
  moveItem(
    itemId: number,
    pile: Pile
  ): Promise<import("./responses/move-item-response").MoveItemResponse>;
  listItem(
    parameters: ListItemParameters
  ): Promise<import("./responses/list-item-response").ListItemResponse>;
  quickSellItem(itemId: number): Promise<void>;
  redeemItem(
    itemId: number
  ): Promise<import("./responses/redeem-item-response").RedeemItemResponse>;
  selectItem(resourceId: number): Promise<void>;
  getPacks(): Promise<import("./responses/get-packs-response").GetPacksResponse>;
  previewPack(
    packId: number
  ): Promise<import("./responses/preview-pack-response").PreviewPackResponse>;
  buyPack(
    packId: number,
    untradeable: boolean,
    coins: number
  ): Promise<import("./responses/buy-pack-response").BuyPackResponse>;
  getSbcs(): Promise<import("./responses/get-sbc-response").GetSbcResponse>;
  getSbcChallenges(
    sbcId: number
  ): Promise<import("./responses/get-sbc-set-response").GetSbcSetResponse>;
  getSbcChallengeSquad(
    challengeId: number
  ): Promise<import("./responses/get-sbc-set-squad-response").GetSbcSetSquadResponse>;
  updateSbcChallengeSquad(
    challengeId: number,
    squad: { index: number; itemId: number }[]
  ): Promise<void>;
  submitSbcChallenge(
    challengeId: number,
    chemistryProfileVersion: number
  ): Promise<import("./responses/submit-sbc-set-response").SubmitSbcSetResponse>;
  getChemistryProfile(): Promise<
    import("./responses/get-chemistry-profile-response").GetChemistryProfileResponse
  >;
  startSbcChallenge(challengeId: number): Promise<void>;
  getRememberCookie(): string;
  getSid(): string | undefined;
}
