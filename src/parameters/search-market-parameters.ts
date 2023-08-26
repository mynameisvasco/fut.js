import { ChemistryStyle } from "../enums/chemistry-style";
import { Level } from "../enums/level";
import { Position } from "../enums/position";

export interface SearchMarketParamters {
  type: string;
  page: number;
  minBuy?: number;
  maxBuy?: number;
  minBid?: number;
  maxBid?: number;
  level?: Level;
  resourceId?: number;
  league?: number;
  nation?: number;
  team?: number;
  rarityId?: number;
  position?: Position;
  chemistryStyle?: ChemistryStyle;
}
