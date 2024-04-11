import { ITwoFactorProvider } from "../interfaces/itwo-factor-provider";
export declare class EmailProvider implements ITwoFactorProvider {
    constructor();
    getCode(): string;
    getMethodName(): string;
}
