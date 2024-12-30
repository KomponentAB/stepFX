import { TileDescriptor } from "@workadventure/iframe-api-typings";
import { SoundConfig } from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Sound/Sound";
import { FireworkColors, FIREWORKS_CONFIG } from "./config/fireworks.config";

export function setupLocalFireworks(): void {
  const button = "firework-btn";

  WA.ui.actionBar.addButton({
    id: button,
    label: "Fireworks! 🎆",
    type: "button",
    callback: () => {
      WA.ui.actionBar.removeButton(button);
      triggerFirework().then(() => setupLocalFireworks());
    },
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

  const colors = Object.values(FireworkColors);
  const selectedColor = colors[Math.floor(Math.random() * colors.length)];

  const tileConfig: TileDescriptor = {
    x: Math.floor(origin.x / 32),
    y: Math.floor(origin.y / 32),
    layer: FIREWORKS_CONFIG.animationLayer,
    tile: null, // Placeholder, will be set per tile
  };

  const tiles = new Array(9).fill(null).map((_, index) => {
    const dx = (index % 3) - 1; // -1, 0, 1 for column offset
    const dy = Math.floor(index / 3) - 1; // -1, 0, 1 for row offset
    return {
      ...tileConfig,
      x: tileConfig.x + dx,
      y: tileConfig.y + dy,
      tile: `${selectedColor}_${index + 1}`,
    };
  });

  WA.room.setTiles([...tiles]);

  playSound(`${import.meta.env.BASE_URL}/sounds/firework_single.mp3`);

  WA.event.broadcast("firework", {
    playerId: WA.player.id,
    x: tileConfig.x,
    y: tileConfig.y,
    color: selectedColor,
  });
  console.log("ping send");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        WA.room.setTiles([...tiles.map((x) => ({ ...x, tile: null }))]);
        resolve();
      } catch (e) {
        console.error("Failed to trigger firework", e);
        reject(e);
      }
    }, FIREWORKS_CONFIG.fireworkDuration); // Remove tiles after FireworkDuration (1400ms)
  });

  function playSound(path: string) {
    const newSound = WA.sound.loadSound(path);
    const positive = Math.random() >= 0.5;
    const detune = Math.round(Math.random() * 850);
    const config: SoundConfig = {
      loop: false,
      detune: positive ? detune : -detune,
    };
    newSound.play(config);
  }
}
