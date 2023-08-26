import { ListDuration } from "../enums/list-duration";

export interface ListItemParameters {
  itemId: number;
  buyNowPrice: number;
  startingBid: number;
  duration: ListDuration;
}
