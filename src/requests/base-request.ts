import axios, { AxiosInstance } from "axios";
import { mapException } from "../models/exception-mapper";

export abstract class BaseRequest<T> {
  protected abstract perform(httpClient: AxiosInstance): Promise<T>;

  public async performWithHandling(httpClient: AxiosInstance) {
    const retryRequestErrorCodes = [500, 429, 426, 503];
    const retryRequestMessages = [
      "Authentication failed",
      "proxy rejected",
      "connection timed out",
    ];

    let tries = 0;
    let lastStatusCode = 0;
    let lastError;

    while (tries < 3) {
      try {
        return await this.perform(httpClient);
      } catch (error: any) {
        if (!axios.isAxiosError(error)) {
          throw error;
        }

        lastError = error;
        lastStatusCode = error.response?.status || 0;

        if (
          !retryRequestErrorCodes.includes(lastStatusCode) &&
          !retryRequestMessages.find((m) => lastError.message.includes(m))
        ) {
          break;
        }

        tries++;
        await new Promise((r) => setTimeout(r, 3000));
      }
    }

    const exception = mapException(lastStatusCode, lastError.message);
    throw exception ?? lastError;
  }
}
