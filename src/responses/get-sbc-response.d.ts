import { SbcSet } from "../models/sbc-set";

export interface GetSbcResponse {
  categories: {
    categoryId: number;
    name: string;
    priority: number;
    sets: SbcSet[];
  }[];
}
