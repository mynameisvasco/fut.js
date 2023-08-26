import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { PreviewPackResponse } from "../responses/preview-pack-response";

export class PreviewPackRequest extends BaseRequest<PreviewPackResponse> {
  constructor(private packId: number) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.post(
      `${Constants.BaseUrl}/preview/pack/${this.packId}/items`,
      {
        headers: { Host: Constants.UtasHost, "Content-Type": "application/json" },
      }
    );

    return response.data as PreviewPackResponse;
  }
}
