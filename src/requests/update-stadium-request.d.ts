import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { StadiumTier } from "../enums/stadium-tier";
export declare class UpdateStadiumRequest extends BaseRequest<void> {
    private tiers;
    constructor(tiers: {
        tier: StadiumTier;
        slot: number;
        itemId: number;
    }[]);
    protected perform(httpClient: AxiosInstance): Promise<void>;
}
