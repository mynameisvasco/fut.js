import { mapException } from "../models/exception-mapper";
export class BaseRequest {
    async performWithHandling(httpClient) {
        const retryRequestErrorCodes = [500, 429, 426, 503, 502, 400, 460, 403, 512, 521];
        const retryRequestMessages = [
            "write EBADF",
            "Socks5 Authentication failed",
            "proxy rejected",
            "connection timed out",
            "timeout",
            "network socket disconnected",
            "ECONNREFUSED",
            "ECONNRESET",
            "Socket closed",
            "socket hang up",
        ];
        let tries = 0;
        let lastStatusCode = 0;
        let lastError = null;
        while (tries < 3) {
            try {
                return await this.perform(httpClient);
            }
            catch (error) {
                lastError = error;
                lastStatusCode = error.response?.status ?? error.status ?? 0;
                if (!retryRequestErrorCodes.includes(lastStatusCode) &&
                    !retryRequestMessages.find((m) => lastError.message.includes(m))) {
                    break;
                }
                tries++;
                await new Promise((r) => setTimeout(r, 3000));
            }
        }
        const exception = mapException(lastStatusCode, lastError.message, this);
        throw exception ?? lastError;
    }
}
