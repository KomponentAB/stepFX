import { TileDescriptor } from "@workadventure/iframe-api-typings";
import { SoundConfig } from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Sound/Sound";
import { FIREWORKS_CONFIG } from "./config/fireworks.config";

export function setupLocalFireworks(): void {
  WA.ui.actionBar.addButton({
    id: "firework-btn",
    label: "Fireworks! 🎆",
    type: "button",
    callback: () => triggerFirework(),
  });

  /* -------------------------------------------------------------------------- */
  /*                                DOES NOT WORK                               */
  /* -------------------------------------------------------------------------- */
  //   document.addEventListener("keydown", (ev) => {
  //     console.log(ev);
  //     if (ev.key === "F") {
  //       triggerFirework().then(() => {
  //         console.log("🎇🧨🎆");
  //       });
  //     }
  //   });
}

export async function triggerFirework(): Promise<void> {
  const origin = await WA.player.getPosition();

  const tileConfig: TileDescriptor = {
    x: Math.floor(origin.x / 32),
    y: Math.floor(origin.y / 32),
    layer: FIREWORKS_CONFIG.animationLayer,
    tile: FIREWORKS_CONFIG.firstgid + FIREWORKS_CONFIG.tileId,
  };

  const tiles = new Array(9).fill(null).map((_, index) => {
    const dx = (index % 3) - 1; // -1, 0, 1 for column offset
    const dy = Math.floor(index / 3) - 1; // -1, 0, 1 for row offset
    return {
      ...tileConfig,
      x: tileConfig.x + dx,
      y: tileConfig.y + dy,
    };
  });

  WA.room.setTiles([...tiles]);

  playSound(`${import.meta.env.BASE_URL}/sounds/firework_single.mp3`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        WA.room.setTiles([...tiles.map((x) => ({ ...x, tile: null }))]);
        resolve();
      } catch (e) {
        console.error("Failed to trigger firework", e);
        reject(e);
      }
    }, 1000 * 2.5);
  });
}

function playSound(path: string) {
  const newSound = WA.sound.loadSound(path);
  const config: SoundConfig = {
    loop: false,
    detune: Math.round(Math.random() * 150),
  };
  newSound.play(config);
}
