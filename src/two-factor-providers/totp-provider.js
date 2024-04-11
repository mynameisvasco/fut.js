import totp from "totp-generator";
export class TotpProvider {
    gauth;
    constructor(gauth) {
        this.gauth = gauth;
    }
    getCode() {
        return totp(this.gauth);
    }
    getMethodName() {
        return "APP";
    }
}
