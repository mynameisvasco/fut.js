import { FutException } from "../exceptions/fut-exception";
export function mapException(status, message, parameters) {
    if (message?.includes("proxy rejected") ||
        message?.includes("Socks5 Authentication failed") ||
        message?.includes("connection timed out") ||
        message?.includes("network socket disconnected") ||
        message?.includes("ECONNREFUSED") ||
        message?.includes("ECONNRESET") ||
        message?.includes("Socket closed") ||
        message?.includes("socket hang up") ||
        message?.includes("write EBADF") ||
        message?.includes("timeout")) {
        return new FutException("proxyDown", parameters);
    }
    switch (status) {
        case 400:
            return new FutException("badRequest", parameters);
        case 401:
            return new FutException("expiredSession", parameters);
        case 403:
            return new FutException("loggedInOnConsole", parameters);
        case 404:
            return new FutException("notFound", parameters);
        case 407:
            return new FutException("proxyDown", parameters);
        case 409:
            return new FutException("conflict", parameters);
        case 410:
            return new FutException("clearSoldDenied", parameters);
        case 426:
            return new FutException("proxyDown", parameters);
        case 429:
            return new FutException("proxyDown", parameters);
        case 458:
        case 459:
            return new FutException("captcha", parameters);
        case 460:
            return new FutException("badRequest", parameters);
        case 461:
            return new FutException("permissionDenied", parameters);
        case 465:
            return new FutException("noClub", parameters);
        case 470:
            return new FutException("notEnoughCredit", parameters);
        case 471:
            return new FutException("purchasedItemsFull", parameters);
        case 473:
            return new FutException("destinationFull", parameters);
        case 474:
            return new FutException("loggedInOnConsole", parameters);
        case 475:
            return new FutException("invalidTransaction", parameters);
        case 478:
            return new FutException("noSuchTradeExists", parameters);
        case 481:
        case 494:
            return new FutException("noMarket", parameters);
        case 491:
            return new FutException("disabled", parameters);
        case 500:
            return new FutException("eaDown", parameters);
        case 512:
        case 521:
            return new FutException("softBan", parameters);
        default:
            return null;
    }
}
