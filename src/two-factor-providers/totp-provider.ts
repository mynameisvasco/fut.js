import { ITwoFactorProvider } from "../interfaces/itwo-factor-provider";
import totp from "totp-generator";

export class TotpProvider implements ITwoFactorProvider {
  constructor(private gauth: string) {}

  getCode() {
    return totp(this.gauth);
  }

  getMethodName() {
    return "APP";
  }
}
