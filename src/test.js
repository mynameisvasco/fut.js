import { Platform } from "./enums/platform";
import { Sku } from "./enums/sku";
import { FutClient } from "./fut-client";
import { TotpProvider } from "./two-factor-providers/totp-provider";

const fut = new FutClient(undefined, undefined, {
  host: "178.171.89.211",
  port: 5432,
  username: "f72ay",
  password: "d8anzcdt",
  protocol: "socks",
});

const { accessToken } = await fut.getAccessToken({
  email: "ashersomw@outlook.com",
  password: "z12Ia8I0j",
  platform: Platform.Xbox,
  priority: 1,
  sku: Sku.FUT25WEB,
  twoFactorProvider: new TotpProvider("HQZJOPJJTHI56SIQ"),
});

const { persona, clubGameSku, pidId } = await fut.getSelectedPersona(
  accessToken,
  Sku.FUT24WEB,
  Platform.Xbox
);

const accessCode = await fut.getAccessCode(accessToken, "ut-auth");

const utas = await fut.getUtas({
  accessCode: accessCode.code,
  gameSku: clubGameSku,
  personaId: persona.personaId,
  priority: 4,
  sku: Sku.FUT25WEB,
});
