import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class PreviewPackRequest extends BaseRequest {
    packId;
    constructor(packId) {
        super();
        this.packId = packId;
    }
    async perform(httpClient) {
        const response = await httpClient.post(`${Constants.BaseUrl}/preview/pack/${this.packId}/items`, {
            headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
        });
        return response.data;
    }
}
