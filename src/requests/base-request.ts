import { AxiosError, AxiosInstance, isAxiosError } from "axios";
import { mapException } from "../models/exception-mapper";

export abstract class BaseRequest<T> {
  protected abstract perform(httpClient: AxiosInstance): Promise<T>;

  public async performWithHandling(httpClient: AxiosInstance) {
    const retryRequestErrorCodes = [500, 429, 426, 503, 502, 400, 460, 403, 512, 521];
    const retryRequestMessages = [
      "write EBADF",
      "Socks5 Authentication failed",
      "proxy rejected",
      "connection timed out",
      "timeout",
      "network socket disconnected",
      "ECONNREFUSED",
      "socket hang up",
    ];

    let tries = 0;
    let lastStatusCode = 0;
    let lastError: Error | null = null;

    while (tries < 3) {
      try {
        return await this.perform(httpClient);
      } catch (error: any) {
        lastError = error;
        lastStatusCode = isAxiosError(error) ? error.response?.status ?? 0 : error.status ?? 0;

        if (
          !retryRequestErrorCodes.includes(lastStatusCode) &&
          !retryRequestMessages.find((m) => lastError!.message.includes(m))
        ) {
          break;
        }

        tries++;
        await new Promise((r) => setTimeout(r, 3000));
      }
    }

    const exception = mapException(lastStatusCode, lastError!.message, this);
    throw exception ?? lastError;
  }
}
