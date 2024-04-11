import axios from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class AutoClaimObjetivesRequest extends BaseRequest {
    constructor() {
        super();
    }
    async perform(httpClient) {
        const response = await httpClient.get(`${Constants.BaseUrl}/scmp/objective/categories/all`, {
            headers: { Host: Constants.UtasHost },
        });
        const groups = response.data
            .flatMap((category) => category.groupsList)
            .filter((group) => group?.objectives?.find((objective) => objective.state === "COMPLETED" || objective.state === "XP_REDEEMED"));
        const rewards = [];
        for (const group of groups ?? []) {
            try {
                const response = await httpClient.put(`${Constants.BaseUrl}/scmp/campaign/group/${group.groupId}/rewards/all?groupType=${group.groupType}`, undefined, { headers: { Host: Constants.UtasHost } });
                rewards.push(response.data);
            }
            catch (e) {
                if (axios.isAxiosError(e)) {
                    if (e.code === "500" || e.status === 500 || e.response?.status === 500) {
                        continue;
                    }
                }
                throw e;
            }
        }
        return rewards;
    }
}
