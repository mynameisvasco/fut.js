import { ITwoFactorProvider } from "../interfaces/itwo-factor-provider";

export class BackupProvider implements ITwoFactorProvider {
  constructor(private code: string) {}

  getCode() {
    return this.code;
  }

  getMethodName() {
    return "EMAIL";
  }
}
