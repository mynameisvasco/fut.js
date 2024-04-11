import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { Level } from "../enums/level";
import { Position } from "../enums/position";
import { Util } from "../util";
export class SearchMarketRequest extends BaseRequest {
    parameters;
    constructor(parameters) {
        super();
        this.parameters = parameters;
    }
    async perform(httpClient) {
        const response = await httpClient.get(`${Constants.BaseUrl}/transfermarket?${this.getSearchQuery()}`, {
            headers: { Host: Constants.UtasHost },
            validateStatus: (status) => status === 429 || status === 426 || status === 200,
        });
        if (response.status === 429 || response.status === 426) {
            return { auctionInfo: [] };
        }
        return response.data;
    }
    getSearchQuery() {
        const searchQuery = new URLSearchParams();
        searchQuery.set("num", "21");
        searchQuery.set("start", `${this.parameters.page * (21 - 1)}`);
        searchQuery.set("type", this.parameters.type);
        if (this.parameters.rarityId) {
            searchQuery.set("rarityIds", this.parameters.rarityId.toString());
        }
        if (this.parameters.level === Level.Special) {
            searchQuery.set("rare", this.parameters.level);
        }
        else if (this.parameters.level) {
            searchQuery.set("lev", this.parameters.level);
        }
        if (this.parameters.nation && this.parameters.nation !== 0) {
            searchQuery.set("nat", this.parameters.nation.toString());
        }
        if (this.parameters.league && this.parameters.league !== 0) {
            searchQuery.set("leag", this.parameters.league.toString());
        }
        if (this.parameters.team && this.parameters.team !== 0) {
            searchQuery.set("team", this.parameters.team.toString());
        }
        if (this.parameters.chemistryStyle) {
            searchQuery.set("playStyle", this.parameters.chemistryStyle.toString());
        }
        if (this.parameters.minBid && this.parameters.minBid !== 0) {
            searchQuery.set("micr", this.parameters.minBid.toString());
        }
        if (this.parameters.maxBid && this.parameters.maxBid !== 0) {
            searchQuery.set("macr", this.parameters.maxBid.toString());
        }
        if (this.parameters.minBuy && this.parameters.minBuy !== 0) {
            searchQuery.set("minb", this.parameters.minBuy.toString());
        }
        if (this.parameters.maxBuy && this.parameters.maxBuy !== 0) {
            searchQuery.set("maxb", this.parameters.maxBuy.toString());
        }
        if (this.parameters.resourceId) {
            if (this.parameters.resourceId <= 16777216 && this.parameters.resourceId > 0) {
                searchQuery.set("maskedDefId", Util.calculateBaseId(this.parameters.resourceId).toString());
            }
            else if (this.parameters.resourceId > 16777216) {
                searchQuery.set("definitionId", this.parameters.resourceId.toString());
            }
        }
        if (this.parameters.position) {
            if (this.parameters.position > Position.Gk) {
                searchQuery.set("pos", Position[this.parameters.position].toUpperCase());
            }
            else {
                searchQuery.set("zone", Position[this.parameters.position].toLowerCase());
            }
        }
        return searchQuery.toString();
    }
}
