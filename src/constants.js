export class Constants {
  static YearShort = "25";
  static YearFull = "2025";
  static PreviousYearShort = "24";
  static PreviousYearFull = "2024";
  static SearchMarketPageSize = 21;
  static CodeClientId = "FUTWEB_BK_OL_SERVER";
  static UtasHost = "utas.mob.v3.prd.futc-ext.gcp.ea.com";
  static EaGatewayHost = "gateway.ea.com";
  static EaAccountsHost = "accounts.ea.com";
  static EaSignInHost = "signin.ea.com";
  static BaseUrl = `https://${Constants.UtasHost}/ut/game/fc${Constants.YearShort}`;
  static EaUrl = "https://ea.com";
  static WebAcessTokenUri =
    "https://accounts.ea.com/connect/auth?accessToken=&client_id=FC25_JS_WEB_APP&display=web2/login&hide_create=true&locale=en_US&prompt=login&redirect_uri=https://www.ea.com/ea-sports-fc/ultimate-team/web-app/auth.html&release_type=prod&response_type=token&scope=basic.identity+offline+signin+basic.entitlement+basic.persona";
  static MobileAccessTokenUri = `https://accounts.ea.com/connect/auth?accessToken=&client_id=FC25${Constants.YearShort}_COMP_APP&display=web2/login&hide_create=true&locale=en_US&machineProfileKey={Guid.NewGuid().ToString().ToUpperInvariant()}&prompt=login&release_type=prod&response_type=code&scope=basic.identity+offline+signin+basic.entitlement+basic.persona&registration_source=315844&authentication_source=315844`;
  static IPhoneUserAgent =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.2 Mobile/15E148 Safari/604.1";
  static AndroidUserAgent =
    "Mozilla/5.0 (Linux; Android 12; SM-S908U1 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.69 Mobile Safari/537.36 EdgW/1.0";
  static WebUserAgent =
    "Mozilla/5.0 (Windows Mobile 10; Android 10.0; Microsoft; Lumia 950XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36 Edge/40.15254.603";
}
