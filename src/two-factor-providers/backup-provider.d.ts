import { ITwoFactorProvider } from "../interfaces/itwo-factor-provider";
export declare class BackupProvider implements ITwoFactorProvider {
    private code;
    constructor(code: string);
    getCode(): string;
    getMethodName(): string;
}
