import { FutException } from "../exceptions/fut-exception";

export function mapException(status: number, message?: string) {
  if (
    message?.includes("proxy rejected") ||
    message?.includes("Authentication failed") ||
    message?.includes("connection timed out")
  ) {
    return new FutException("proxyDown");
  }

  switch (status) {
    case 400:
      return new FutException("badRequest");
    case 401:
      return new FutException("expiredSession");
    case 403:
      return new FutException("loggedInOnConsole");
    case 404:
      return new FutException("notFound");
    case 407:
      return new FutException("proxyDown");
    case 409:
      return new FutException("conflict");
    case 410:
      return new FutException("clearSoldDenied");
    case 458:
    case 459:
      return new FutException("captcha");
    case 460:
      return new FutException("badRequest");
    case 461:
      return new FutException("permissionDenied");
    case 470:
      return new FutException("notEnoughCredit");
    case 471:
      return new FutException("purchasedItemsFull");
    case 473:
      return new FutException("destinationFull");
    case 474:
      return new FutException("loggedInOnConsole");
    case 475:
      return new FutException("invalidTransaction");
    case 478:
      return new FutException("noSuchTradeExists");
    case 481:
    case 494:
      return new FutException("noMarket");
    case 512:
    case 521:
      return new FutException("softBan");
    default:
      return null;
  }
}
