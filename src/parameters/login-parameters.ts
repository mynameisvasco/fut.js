import { ITwoFactorProvider } from "../interfaces/itwo-factor-provider";
import { Platform } from "../enums/platform";
import { Sku } from "../enums/sku";

export class LoginParameters {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly twoFactorProvider: ITwoFactorProvider,
    public readonly platform: Platform,
    public readonly sku: Sku,
    public readonly priority: number
  ) {}
}
