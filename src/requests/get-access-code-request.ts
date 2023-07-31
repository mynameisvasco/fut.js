import { BaseRequest } from "./base-request";
import { GetAccessCodeResponse } from "../responses/get-access-code-response";
import { AxiosInstance } from "axios";
import { Constants } from "../constants";

export class GetAccessCodeRequest extends BaseRequest<GetAccessCodeResponse> {
  constructor(private accessToken: string, private sequence: string) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
    const response = await httpClient.get(
      `https://accounts.ea.com/connect/auth?client_id=${Constants.CodeClientId}&redirect_uri=nucleus:rest&response_type=code&access_token=${this.accessToken}&release_type=prod&client_sequence=${this.sequence}`
    );

    return response.data as GetAccessCodeResponse;
  }
}
