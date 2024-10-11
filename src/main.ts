/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";

console.log("Script started successfully");
// Waiting for the API to be ready
WA.onInit().then(() => {
  console.log("Scripting API ready");
  console.log("Player tags: ", WA.player.tags);
});

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
bootstrapExtra()
  .then(() => {
    console.log("Scripting API Extra ready");
  })
  .catch((e: any) => console.error(e));

WA.onInit().then(async () => {
  WA.player.onPlayerMove(async ({ x, y, moving }) => {
    const material = await checkPlayerMaterial({ x, y });
    console.log(material);

    if (!moving || !material) {
      mySound.stop();
    } else {
      playRandomSound(material);
    }
  });
});
