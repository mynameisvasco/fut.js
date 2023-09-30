import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";

export class AutoClaimObjetivesRequest extends BaseRequest<any> {
  constructor() {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.get(`${Constants.BaseUrl}/scmp/objective/categories/all`, {
      headers: { Host: Constants.UtasHost },
    });

    const groups = response.data
      .flatMap((category: any) => category.groupsList)
      .filter((group: any) =>
        group.objectives.find(
          (objective: any) => objective.state === "COMPLETED" || objective.state === "XP_REDEEMED"
        )
      );

    const rewards: any = [];

    for (const group of groups) {
      const response = await httpClient.put(
        `${Constants.BaseUrl}/scmp/campaign/group/${group.groupId}/rewards/all?groupType=${group.groupType}`,
        undefined,
        { headers: { Host: Constants.UtasHost } }
      );

      rewards.push(response.data);
    }

    return rewards;
  }
}
