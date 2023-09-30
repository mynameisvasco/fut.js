import { Sku } from "../enums/sku";
import { IJSEngine } from "../interfaces/ijsengine";

export interface AuthenticateUtasParameters {
  personaId: number;
  sku: Sku;
  gameSku: string;
  accessCode: string;
  priority: number;
  jsEngine?: IJSEngine;
}
