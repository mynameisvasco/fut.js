import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class GetUnassignedPileRequest extends BaseRequest {
    async perform(httpClient) {
        const response = await httpClient.get(`${Constants.BaseUrl}/purchased/items`, {
            headers: { Host: Constants.UtasHost },
        });
        return response.data;
    }
}
