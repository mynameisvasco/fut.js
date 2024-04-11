import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class AppStatsRequest extends BaseRequest {
    nucleusId;
    personaId;
    sid;
    jsEngine;
    constructor(nucleusId, personaId, sid, jsEngine) {
        super();
        this.nucleusId = nucleusId;
        this.personaId = personaId;
        this.sid = sid;
        this.jsEngine = jsEngine;
    }
    async perform(httpClient) {
        if (this.jsEngine) {
            await httpClient.post(`${Constants.BaseUrl}/appstats`, {
                data: await this.jsEngine.getTel(this.sid, this.nucleusId, this.personaId),
                type: "COMPANION",
            }, { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } });
        }
    }
}
