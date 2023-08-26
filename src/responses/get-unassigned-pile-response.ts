import { ItemData } from "../models/item-data";

export interface GetUnassignedPileResponse {
  itemData: ItemData[];
  duplicatedItemIdList: {
    duplicateItemId: number;
    itemId: number;
  }[];
}
