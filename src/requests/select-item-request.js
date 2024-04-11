import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class SelectItemRequest extends BaseRequest {
    resourceId;
    constructor(resourceId) {
        super();
        this.resourceId = resourceId;
    }
    async perform(httpClient) {
        await httpClient.post(`${Constants.BaseUrl}/playerpicks/item/${this.resourceId}/select`, {
            headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
        });
    }
}
