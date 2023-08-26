import { ITwoFactorProvider } from "../interfaces/itwo-factor-provider";
import { Platform } from "../enums/platform";
import { Sku } from "../enums/sku";

export interface LoginParameters {
  email: string;
  password: string;
  twoFactorProvider: ITwoFactorProvider;
  platform: Platform;
  sku: Sku;
  priority: number;
}
