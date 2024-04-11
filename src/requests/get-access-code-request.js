import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class GetAccessCodeRequest extends BaseRequest {
    accessToken;
    sequence;
    constructor(accessToken, sequence) {
        super();
        this.accessToken = accessToken;
        this.sequence = sequence;
    }
    async perform(httpClient) {
        const response = await httpClient.get(`https://accounts.ea.com/connect/auth?client_id=${Constants.CodeClientId}&redirect_uri=nucleus:rest&response_type=code&access_token=${this.accessToken}&release_type=prod&client_sequence=${this.sequence}`, {
            headers: {
                Host: Constants.EaAccountsHost,
                Origin: "https://www.ea.com",
                Referer: "https://www.ea.com/",
            },
        });
        return response.data;
    }
}
