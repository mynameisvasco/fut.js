import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { LoginParameters } from "../parameters/login-parameters";
import { FutException } from "../exceptions/fut-exception";

const randomCid = (length: number) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  return Array(length)
    .fill("")
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
};

export class AccessTokenRequest extends BaseRequest<string> {
  constructor(private loginParameters: LoginParameters) {
    super();
  }

  protected async perform(httpClient: AxiosInstance): Promise<string> {
    const loginUrlResponse = await httpClient.get(Constants.WebAcessTokenUri);
    const loginUrl = loginUrlResponse.request.res.responseUrl;

    if (loginUrl.includes("#access_token")) {
      return loginUrl.split("=")[1].split("&")[0].trim();
    }

    const loginResponse = await httpClient.post(
      loginUrl,
      new URLSearchParams({
        email: this.loginParameters.email,
        regionCode: "US",
        phoneNumber: "",
        password: this.loginParameters.password,
        _eventId: "submit",
        cid: randomCid(32),
        showAgeUp: "true",
        thirdPartyCaptchaResponse: "",
        loginMethod: "emailPassword",
        _rememberMe: "on",
        rememberMe: "on",
      }),
      { headers: { Host: Constants.EaSignInHost, Referer: loginUrl } }
    );

    let html: string = loginResponse.data;
    let nextUrl = loginResponse.request.res.responseUrl;

    if (html.includes("Enable two-factor authentication")) {
      throw new FutException("NoTwoFactor");
    }

    if (html.includes("Your account has been disabled")) {
      throw new FutException("Disabled");
    }

    if (html.includes('otkform-group-haserror">')) {
      if (html.includes("Your EA credentials have expired")) {
        throw new FutException("ExpiredCredentials");
      }

      if (html.includes("Your credentials are incorrect")) {
        throw new FutException("WrongCredentials");
      }
    }

    if (html.includes("Please review our terms")) {
      const tosResponse = await httpClient.post(
        nextUrl,
        new URLSearchParams({
          _readAccept: "on",
          readAccept: "on",
          _eventId: "accept",
        }),
        { headers: { Host: Constants.EaSignInHost, Referer: nextUrl } }
      );

      html = tosResponse.data;
      nextUrl = tosResponse.request.res.responseUrl;
    }

    let [completeUrl] = new RegExp(
      "https...accounts.ea.com([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?"
    ).exec(html) ?? [""];

    if (completeUrl === "") {
      const securityResponse = await httpClient.post(
        nextUrl,
        new URLSearchParams({
          codeType: this.loginParameters.twoFactorProvider.getMethodName(),
          _eventId: "submit",
        }),
        { headers: { Host: Constants.EaSignInHost, Referer: nextUrl } }
      );

      html = securityResponse.data;
      nextUrl = securityResponse.request.res.responseUrl;

      const codeResponse = await httpClient.post(
        nextUrl,
        new URLSearchParams({
          oneTimeCode: this.loginParameters.twoFactorProvider.getCode(),
          _trustThisDevice: "on",
          trustThisDevice: "on",
          _eventId: "submit",
        }),
        { headers: { Host: Constants.EaSignInHost, Referer: nextUrl } }
      );

      html = codeResponse.data;
      nextUrl = codeResponse.request.res.responseUrl;

      if (html.includes("The security code you entered is invalid")) {
        throw new FutException("WrongCode");
      }

      [completeUrl] = new RegExp(
        "https...accounts.ea.com([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?"
      ).exec(html) ?? [""];

      if (!completeUrl || completeUrl === "") {
        throw new FutException("WrongCode");
      }
    }

    const completeResponse = await httpClient.get(completeUrl);
    nextUrl = completeResponse.request.res.responseUrl.replace("#", "?");
    return new URL(nextUrl).searchParams.get("access_token") ?? "";
  }
}
