import { Sku } from "../enums/sku";

export class AuthenticateUtasParameters {
  constructor(
    public readonly personaId: number,
    public readonly sku: Sku,
    public readonly gameSku: string,
    public readonly accessCode: string,
    public readonly priority: number
  ) {}
}
