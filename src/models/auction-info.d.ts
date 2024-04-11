import { TradeState } from "../enums/trade-state";
import { ItemData } from "./item-data";
export interface AuctionInfo {
    bidState: string;
    buyNowPrice: number;
    confidenceValue: number;
    currentBid: number;
    expires: number;
    itemData: ItemData;
    offers: number;
    sellerEstablished: number;
    sellerId: number;
    sellerName: string;
    startingBid: number;
    tradeId: number;
    tradeOwner?: boolean | null;
    tradeState?: TradeState | null;
    watched?: boolean | null;
}
