import { ITwoFactorProvider } from "../interfaces/itwo-factor-provider";
export declare class TotpProvider implements ITwoFactorProvider {
    private gauth;
    constructor(gauth: string);
    getCode(): string;
    getMethodName(): string;
}
