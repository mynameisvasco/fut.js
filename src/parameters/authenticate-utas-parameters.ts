import { Sku } from "../enums/sku";

export interface AuthenticateUtasParameters {
  personaId: number;
  sku: Sku;
  gameSku: string;
  accessCode: string;
  priority: number;
}
