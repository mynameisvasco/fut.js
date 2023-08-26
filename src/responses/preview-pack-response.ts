import { ItemData } from "../models/item-data";

export interface PreviewPackResponse {
  itemList: ItemData[];
  numberItems: number;
  packId: number;
  previewItemDefId: number;
  previewCreateTime: number;
  previewExpireTime: number;
}
