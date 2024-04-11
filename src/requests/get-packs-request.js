import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class GetPacksRequest extends BaseRequest {
    async perform(httpClient) {
        const response = await httpClient.get(`${Constants.BaseUrl}/store/purchaseGroup/all?ppInfo=true&categoryInfo=true`, { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } });
        return response.data;
    }
}
