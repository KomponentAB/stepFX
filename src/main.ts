/// <reference types="@workadventure/iframe-api-typings" />
/// <reference types="vite/client" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { setupLocalFireworks, triggerFirework } from "./fireworks";
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

    if (!material) {
      return mySound?.stop();
    }

    if (!moving && !material) {
      return mySound?.stop();
    } else {
      mySound?.stop();
      return playRandomSound(material);
    }
  });

  setupLocalFireworks();
  console.log("🎆 Fireworks initialized successfully");
});

WA.event.on('firework').subscribe((value) => {
  const { playerId, x, y, color } = value.data as { playerId: string; x: number; y: number; color: string };
  if (playerId !== WA.player.id) {
    triggerColoredFirework(x, y, color);
  }
});

function triggerColoredFirework(x: number, y: number, color: string) {
  console.log(`Triggering colored firework at (${x}, ${y}) with color ${color}`);

  playSound(`${import.meta.env.BASE_URL}/sounds/firework_single.mp3`);
  function playSound(path: string) {
      const newSound = WA.sound.loadSound(path);
      const positive = Math.random() >= 0.2;
      const detune = Math.round(Math.random() * 850);
      const config: { loop: boolean; detune: number } = {
        loop: false,
        detune: positive ? detune : -detune,
      };
      newSound.play(config);
    }

  // Example tiles for the firework (you need to replace this with actual tile data)
  const tiles = new Array(9).fill(null).map((_, index) => {
    const dx = (index % 3) - 1; // -1, 0, 1 for column offset
    const dy = Math.floor(index / 3) - 1; // -1, 0, 1 for row offset
    return {
      x: x + dx,
      y: y + dy,
      tile: `${color}_${index + 1}`,
      layer: 'anim'
    };
  });

  // Set the tiles for the firework
  WA.room.setTiles(tiles);

  // Remove the tiles after the firework duration
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        WA.room.setTiles([...tiles.map((tile) => ({ ...tile, tile: null, layer: 'anim' }))]);
        resolve(undefined);
      } catch (e) {
        console.error("Failed to trigger firework", e);
        reject(e);
      }
    }, 1400); // Remove tiles after FireworkDuration (1400ms)
  });
}