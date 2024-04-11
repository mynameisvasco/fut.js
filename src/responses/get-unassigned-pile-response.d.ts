import { ItemData } from "../models/item-data";
export interface GetUnassignedPileResponse {
    itemData: ItemData[];
    duplicateItemIdList: {
        duplicateItemId: number;
        itemId: number;
    }[];
}
