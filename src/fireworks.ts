import { TileDescriptor } from "@workadventure/iframe-api-typings";
import { SoundConfig } from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Sound/Sound";
import { FIREWORKS_CONFIG } from "./config/fireworks.config";
import { FireworkColors, FireworkConfig } from "./models/fireworks.model";

export function setupFireworks(): void {
  setupFireworksButton();
  setupFireworksListener();
  console.log("🎆 Fireworks initialized successfully");
}

async function generateFireworkConfig(): Promise<FireworkConfig> {
  const { x, y } = await WA.player.getPosition();
  const colors = Object.values(FireworkColors);
  return { x, y, color: colors[Math.floor(Math.random() * colors.length)] };
}

export function setupFireworksButton(): void {
  const button = "firework-btn";

  WA.ui.actionBar.addButton({
    id: button,
    label: "Fireworks! 🎆",
    type: "button",
    callback: async () => {
      const fireworkConfig = await generateFireworkConfig();

      WA.ui.actionBar.removeButton(button); //remove button temporarily
      triggerFirework(fireworkConfig).finally(() => setupFireworksButton()); //restore button after fireworks promise

      WA.event.broadcast("firework", {
        playerId: WA.player.uuid,
        ...fireworkConfig,
      });
    },
  });
}

export async function triggerFirework(
  config: FireworkConfig
): Promise<FireworkConfig> {
  const tiles = await generateFireworkTiles(config);

  WA.room.setTiles(tiles);

  playSound(`${import.meta.env.BASE_URL}/sounds/firework_single.mp3`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        WA.room.setTiles([...tiles.map((x) => ({ ...x, tile: null }))]);
        resolve(config);
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

  async function generateFireworkTiles(
    config: FireworkConfig
  ): Promise<TileDescriptor[]> {
    const tileConfig: TileDescriptor = {
      x: Math.floor(config.x / 32),
      y: Math.floor(config.y / 32),
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
        tile: `${config.color}_${index + 1}`,
      };
    });

    return tiles;
  }
}

function setupFireworksListener() {
  WA.event.on("firework").subscribe((value) => {
    const { playerId, ...fireworkConfig } = value.data as {
      playerId: string;
    } & FireworkConfig;

    if (playerId !== WA.player.uuid) {
      triggerFirework(fireworkConfig);
    }
  });
}
