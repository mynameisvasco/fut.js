import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { StartClubResponse } from "../responses/start-club-response";
export declare class StartClubRequest extends BaseRequest<StartClubResponse> {
    constructor();
    protected perform(httpClient: AxiosInstance): Promise<{
        homeKitResourceId: any;
        awayKitResourceId: any;
        badgeResourceId: any;
    }>;
}
