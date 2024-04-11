export class BackupProvider {
    code;
    constructor(code) {
        this.code = code;
    }
    getCode() {
        return this.code;
    }
    getMethodName() {
        return "EMAIL";
    }
}
