import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
export class StartClubRequest extends BaseRequest {
    constructor() {
        super();
    }
    async perform(httpClient) {
        await httpClient.post(`${Constants.BaseUrl}/user/action/ONBOARDING_COUNTRY_1_SELECTED`, {
            headers: { Host: Constants.UtasHost },
        });
        await httpClient.post(`${Constants.BaseUrl}/user`, { clubAbbr: "Ven", clubName: "Venezia AC", purchased: true }, { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } });
        const { data: players } = await httpClient.get(`${Constants.BaseUrl}/loan/players`, {
            headers: { Host: Constants.UtasHost },
        });
        const id = players.loans[0].itemData.id;
        await httpClient.put(`${Constants.BaseUrl}/loan/player/${id}`, {
            headers: { Host: Constants.UtasHost },
        });
        const { data: kits } = await httpClient.get(`${Constants.BaseUrl}/onboarding/kits`, {
            headers: { Host: Constants.UtasHost },
        });
        const awayKit = kits.awayItemDataList.sort((a, b) => {
            if (a.rareflag === 1 && b.rareflag !== 1) {
                return -1;
            }
            else if (a.rareflag !== 1 && b.rareflag === 1) {
                return 1;
            }
            else {
                return b.rating - a.rating;
            }
        })[0];
        const homeKit = kits.homeItemDataList.sort((a, b) => {
            if (a.rareflag === 1 && b.rareflag !== 1) {
                return -1;
            }
            else if (a.rareflag !== 1 && b.rareflag === 1) {
                return 1;
            }
            else {
                return b.rating - a.rating;
            }
        })[0];
        await httpClient.post(`${Constants.BaseUrl}/onboarding/kits`, { awayKitId: awayKit.resourceId, homeKitId: homeKit.resourceId }, { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } });
        const { data: badges } = await httpClient.get(`${Constants.BaseUrl}/onboarding/badges`, {
            headers: { Host: Constants.UtasHost },
        });
        const badge = badges.badgeItemDataList.sort((a, b) => {
            if (a.rareflag === 1 && b.rareflag !== 1) {
                return -1;
            }
            else if (a.rareflag !== 1 && b.rareflag === 1) {
                return 1;
            }
            else {
                return b.rating - a.rating;
            }
        })[0];
        await httpClient.post(`${Constants.BaseUrl}/onboarding/badge/${badge.resourceId}`, { badgeId: badge.resourceId }, { headers: { Host: Constants.UtasHost, "Content-Type": "application/json" } });
        return {
            homeKitResourceId: homeKit.resourceId,
            awayKitResourceId: awayKit.resourceId,
            badgeResourceId: badge.resourceId,
        };
    }
}
