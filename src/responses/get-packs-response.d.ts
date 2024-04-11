import { Pack } from "../models/pack";
export interface GetPacksResponse {
    duplicatesEnable: boolean;
    id: string;
    previewEnabled: boolean;
    purchase: Pack[];
    timestamp: number;
}
