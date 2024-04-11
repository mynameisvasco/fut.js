import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class GetPendingItemsRequest extends BaseRequest {
    async perform(httpClient) {
        const response = await httpClient.get(`${Constants.BaseUrl}/playerpicks/pending`, {
            headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
        });
        return response.data;
    }
}
