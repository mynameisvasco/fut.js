import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class SearchClubRequest extends BaseRequest {
    parameters;
    constructor(parameters) {
        super();
        this.parameters = parameters;
    }
    async perform(httpClient) {
        const response = await httpClient.post(`${Constants.BaseUrl}/club`, {
            count: 91,
            searchAltPositions: true,
            sort: "desc",
            sortBy: "value",
            start: this.parameters.page * (21 - 1),
            type: this.parameters.type,
        }, {
            headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
        });
        return response.data;
    }
}
