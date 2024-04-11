import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class GetUserInfoRequest extends BaseRequest {
    async perform(httpClient) {
        const response = await httpClient.get(`${Constants.BaseUrl}/usermassinfo`, {
            headers: { Host: Constants.UtasHost },
        });
        return response.data;
    }
}
