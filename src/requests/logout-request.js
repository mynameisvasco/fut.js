import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class LogoutRequest extends BaseRequest {
    constructor() {
        super();
    }
    async perform(httpClient) {
        await httpClient.delete(`https://${Constants.UtasHost}/ut/auth`, {
            headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
        });
    }
}
