export interface ITwoFactorProvider {
  getCode(): string;
  getMethodName(): string;
}
