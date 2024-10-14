import { SoundConfig } from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Sound/Sound";
import { MaterialType } from "../models/footstep.model";

export const soundFiles: Record<MaterialType, string[]> = {
  [MaterialType.wood]: [
    "/sounds/wood_01_a.wav",
    "/sounds/wood_01_b.wav",
    "/sounds/wood_01_c.wav",
    "/sounds/wood_01_d.wav",
  ],
  [MaterialType.forest]: [
    "/sounds/forest_01.wav",
    "/sounds/forest_02.wav",
    "/sounds/forest_03.wav",
  ],
  [MaterialType.snow]: [
    "/sounds/snow_01_a.wav",
    "/sounds/snow_01_b.wav",
    "/sounds/snow_01_c.wav",
    "/sounds/snow_01_d.wav",
  ],
  [MaterialType.marble]: [
    "/sounds/marble_01.wav",
    "/sounds/marble_02.wav",
    "/sounds/marble_03.wav",
  ],
  [MaterialType.grass]: [
    "/sounds/grass_01.wav",
    "/sounds/grass_02.wav",
    "/sounds/grass_03.wav",
  ],
  [MaterialType.stone]: [
    "/sounds/stone_01_a.wav",
    "/sounds/stone_01_b.wav",
    "/sounds/stone_01_c.wav",
    "/sounds/stone_01_d.wav",
    "/sounds/stone_01_e.wav",
  ],
};

export const audioConfig: SoundConfig = {
  volume: 0.25,
  loop: false,
  rate: 1.5,
  detune: 1,
  delay: 0,
  seek: 0,
  mute: false,
};
