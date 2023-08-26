import { Pile } from "../enums/pile";

export interface MoveItemResponse {
  itemData: {
    id: number;
    pile: Pile;
    sucess: boolean;
  }[];
}
