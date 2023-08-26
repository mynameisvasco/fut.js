import { ITwoFactorProvider } from "../interfaces/itwo-factor-provider";

export class EmailProvider implements ITwoFactorProvider {
  constructor() {}

  getCode() {
    return "";
  }

  getMethodName() {
    return "EMAIL";
  }
}
