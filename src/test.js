import { FutClient } from "./fut-client";

async function main() {
  const fut = new FutClient("394e25fd-0049-4646-a539-f4ba2f5a055a");

  await fut.updateSbcChallengeSquad(4, [
    { index: 2, itemId: 225173966620 },
    { index: 3, itemId: 225173966650 },
    { index: 6, itemId: 225173966627 },
    { index: 9, itemId: 225173966631 },
  ]);

  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(await fut.submitSbcChallenge(4));
}

main();
