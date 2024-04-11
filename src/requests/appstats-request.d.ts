import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { IJSEngine } from "../interfaces/ijsengine";
export declare class AppStatsRequest extends BaseRequest<void> {
    private nucleusId;
    private personaId;
    private sid;
    private jsEngine?;
    constructor(nucleusId: number, personaId: number, sid: string, jsEngine?: IJSEngine | undefined);
    protected perform(httpClient: AxiosInstance): Promise<void>;
}
