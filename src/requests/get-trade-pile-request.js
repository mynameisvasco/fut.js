import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class GetTradePileRequest extends BaseRequest {
    async perform(httpClient) {
        const response = await httpClient.get(`${Constants.BaseUrl}/tradepile`, {
            headers: { Host: Constants.UtasHost },
        });
        return response.data;
    }
}
