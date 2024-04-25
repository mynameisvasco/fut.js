import { FutClient } from "./fut-client.js";

async function main() {
  const fut = new FutClient("9efcd4db-fb78-4d14-ad72-be7ad9f2d040");

  console.log(await fut.getChemistryProfile());
}

main();
