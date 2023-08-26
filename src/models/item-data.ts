export interface ItemData {
  id: number;
  assetId: number;
  resourceId: number;
  contract: number;
  discardValue: number;
  rareflag: number;
  rating: number;
  untradeable: boolean;
  name?: string | null;
  description?: string | null;
  itemState: string;
  itemType: string;
}
