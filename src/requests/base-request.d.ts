import { AxiosInstance } from "axios";
export declare abstract class BaseRequest<T> {
    protected abstract perform(httpClient: AxiosInstance): Promise<T>;
    performWithHandling(httpClient: AxiosInstance): Promise<T>;
}
