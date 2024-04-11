import { ItemData } from "./item-data";

export declare class Squad {
  id: number;
  formation: string;
  rating: number;
  chemistry: number;
  manager: ItemData[];
  players: { index: number; itemData: ItemData[] };
}
