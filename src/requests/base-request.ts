import axios, { AxiosInstance } from "axios";

export abstract class BaseRequest<T> {
  protected abstract perform(httpClient: AxiosInstance): Promise<T>;

  public async performWithHandling(httpClient: AxiosInstance) {
    const retryRequestErrorCodes = [500, 429, 426, 503];
    let tries = 0;
    let lastStatusCode = 0;

    while (tries < 3) {
      try {
        return await this.perform(httpClient);
      } catch (error: any) {
        if (!axios.isAxiosError(error)) {
          throw error;
        }

        lastStatusCode = error.response?.status || 0;

        if (!retryRequestErrorCodes.includes(lastStatusCode)) {
          throw error;
        }

        tries++;
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    throw new Error("Unknown");
  }
}
