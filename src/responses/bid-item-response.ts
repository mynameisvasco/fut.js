import { AuctionInfo } from "../models/auction-info";

export interface BidItemResponse {
  auctionInfo: AuctionInfo[];
  credits: number;
  duplicatedItemIdList: {
    duplicateItemId: number;
    itemId: number;
  }[];
}
