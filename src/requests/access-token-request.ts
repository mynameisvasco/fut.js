import { AxiosInstance } from "axios";
import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { LoginParameters } from "../parameters/login-parameters";
import { FutException } from "../exceptions/fut-exception";
import { AccessTokenResponse } from "../responses/access-token-response";
import { CookieJar } from "tough-cookie";

const randomCid = (length: number) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  return Array(length)
    .fill("")
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
};

export class AccessTokenRequest extends BaseRequest<AccessTokenResponse> {
  constructor(private loginParameters: LoginParameters) {
    super();
  }

  protected async perform(httpClient: AxiosInstance) {
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
      {
        headers: {
          Host: Constants.EaSignInHost,
          Referer: loginUrl,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    let html: string = loginResponse.data;
    let nextUrl = loginResponse.request.res.responseUrl;

    if (html.includes("Enable two-factor authentication")) {
      throw new FutException("noTwoFactor");
    }

    if (html.includes("Your account has been disabled")) {
      throw new FutException("disabled");
    }

    if (html.includes("Your EA credentials have expired")) {
      throw new FutException("expiredCredentials");
    }

    if (html.includes("Your credentials are incorrect")) {
      throw new FutException("wrongCredentials");
    }

    if (html.includes("Please review our terms")) {
      const tosResponse = await httpClient.post(
        nextUrl,
        new URLSearchParams({
          _readAccept: "on",
          readAccept: "on",
          _eventId: "accept",
        }),
        {
          headers: {
            Host: Constants.EaSignInHost,
            Referer: nextUrl,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
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
        {
          headers: {
            Host: Constants.EaSignInHost,
            Referer: nextUrl,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
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
        {
          headers: {
            Host: Constants.EaSignInHost,
            Referer: nextUrl,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      html = codeResponse.data;
      nextUrl = codeResponse.request.res.responseUrl;

      if (html.includes("The security code you entered is invalid")) {
        throw new FutException("wrongCode");
      }

      [completeUrl] = new RegExp(
        "https...accounts.ea.com([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?"
      ).exec(html) ?? [""];

      if (!completeUrl || completeUrl === "") {
        throw new FutException("wrongCode");
      }
    }

    const completeResponse = await httpClient.get(completeUrl);
    nextUrl = new URL(completeResponse.request.res.responseUrl.replace("#", "?"));
    const accessToken = nextUrl.searchParams.get("access_token") ?? "";
    const expiresIn = Number.parseInt(nextUrl.searchParams.get("expires_in") ?? "0");
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    return { accessToken, expiresAt };
  }
}
