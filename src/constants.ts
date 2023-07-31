export class Constants {
  public static readonly YearShort = "23";
  public static readonly YearFull = "2023";
  public static readonly PreviousYearShort = "22";
  public static readonly PreviousYearFull = "2022";
  public static readonly SearchMarketPageSize = 21;
  public static readonly CodeClientId = "FUTWEB_BK_OL_SERVER";
  public static readonly UtasHost = "utas.mob.v1.fut.ea.com";
  public static readonly EaGatewayHost = "gateway.ea.com";
  public static readonly EaAccountsHost = "accounts.ea.com";
  public static readonly EaSignInHost = "signin.ea.com";
  public static readonly BaseUrl = `https://${Constants.UtasHost}/ut/game/fifa${Constants.YearShort}`;
  public static readonly EaUrl = "https://ea.com";
  public static readonly WebAcessTokenUri = `https://accounts.ea.com/connect/auth?accessToken=&client_id=FIFA${Constants.YearShort}_JS_WEB_APP&display=web2/login&hide_create=true&locale=en_US&redirect_uri=https://www.ea.com/fifa/ultimate-team/web-app/auth.html&release_type=prod&response_type=token&scope=basic.identity+offline+signin+basic.entitlement+basic.persona`;
  public static readonly MobileAccessTokenUri = `https://accounts.ea.com/connect/auth?accessToken=&client_id=FIFA${Constants.YearShort}_COMP_APP&display=web2/login&hide_create=true&locale=en_US&machineProfileKey={Guid.NewGuid().ToString().ToUpperInvariant()}&prompt=login&release_type=prod&response_type=code&scope=basic.identity+offline+signin+basic.entitlement+basic.persona&registration_source=315844&authentication_source=315844`;
  public static readonly IPhoneUserAgent =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.2 Mobile/15E148 Safari/604.1";
  public static readonly AndroidUserAgent =
    "Mozilla/5.0 (Linux; Android 12; SM-S908U1 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.69 Mobile Safari/537.36 EdgW/1.0";
  public static readonly WebUserAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15";
}
