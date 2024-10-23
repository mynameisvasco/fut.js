import { BaseRequest } from "./base-request";
import { Constants } from "../constants";
import { FutException } from "../exceptions/fut-exception";
const randomCid = (length) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  return Array(length)
    .fill("")
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
};
export class AccessTokenRequest extends BaseRequest {
  loginParameters;
  constructor(loginParameters) {
    super();
    this.loginParameters = loginParameters;
  }
  async perform(httpClient) {
    const webappResponse = await httpClient.get(
      "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/",
      {
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "pt-PT,pt;q=0.9,pt-BR;q=0.8,en;q=0.7,en-US;q=0.6,en-GB;q=0.5,es;q=0.4",
          "User-Agent": Constants.WebUserAgent,
          Referer: "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/auth.html",
        },
      }
    );

    const loginUrlResponse = await httpClient.get(Constants.WebAcessTokenUri, {
      headers: {
        "User-Agent": Constants.WebUserAgent,
        "Upgrade-Insecure-Requests": "1",
        Referer: "https://www.ea.com/",
        host: "accounts.ea.com",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      },
    });
    const loginUrl = loginUrlResponse.request.res.responseUrl;

    if (loginUrl.includes("#access_token")) {
      return loginUrl.split("=")[1].split("&")[0].trim();
    }

    const emailResponse = await httpClient.post(
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
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          Host: Constants.EaSignInHost,
          Referer: loginUrl,
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: "https://signin.ea.com",
          "Upgrade-Insecure-Requests": 1,
        },
      }
    );

    let nextUrl = emailResponse.request.res.responseUrl;
    let html = emailResponse.data;

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
    if (html.includes("Review our updated terms")) {
      const tosResponse = await httpClient.post(
        nextUrl,
        new URLSearchParams({
          _readAccept: "on",
          readAccept: "on",
          _eventId: "accept",
        }),
        {
          headers: {
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            Host: Constants.EaSignInHost,
            Referer: nextUrl,
            "Content-Type": "application/x-www-form-urlencoded",
            Origin: "https://signin.ea.com",
            "Upgrade-Insecure-Requests": 1,
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
      let securityParams;
      if (this.loginParameters.twoFactorProvider.getMethodName() === "EMAIL") {
        const regex = new RegExp(".*\\**@.*\\.");
        const matches = regex.exec(html);
        const maskedDestination = matches
          ? matches[0].split("").every((char) => char !== "i") // Check if 'input' is not present
            ? matches[0].replace("We'll send a verification code to ", "").replace(/\.$/, "")
            : ""
          : "";
        securityParams = new URLSearchParams({
          codeType: this.loginParameters.twoFactorProvider.getMethodName(),
          _codeType: this.loginParameters.twoFactorProvider.getMethodName(),
          _eventId: "submit",
          maskedDestination,
        });
      } else {
        securityParams = new URLSearchParams({
          codeType: this.loginParameters.twoFactorProvider.getMethodName(),
          _codeType: this.loginParameters.twoFactorProvider.getMethodName(),
          _eventId: "submit",
        });
      }
      const securityResponse = await httpClient.post(nextUrl, securityParams, {
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          Host: Constants.EaSignInHost,
          Referer: nextUrl,
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: "https://signin.ea.com",
          "Upgrade-Insecure-Requests": 1,
        },
      });
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
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            Host: Constants.EaSignInHost,
            Referer: nextUrl,
            "Content-Type": "application/x-www-form-urlencoded",
            Origin: "https://signin.ea.com",
            "Upgrade-Insecure-Requests": 1,
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
