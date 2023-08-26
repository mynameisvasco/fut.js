import { ItemData } from "../models/item-data";

export interface RedeemItemResponse {
  itemData: ItemData[];
  duplicatedItemIdList: {
    duplicateItemId: number;
    itemId: number;
  }[];
}
