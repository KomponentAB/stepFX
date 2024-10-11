import { SoundConfig } from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Sound/Sound";
import { MaterialType } from "../models/footstep.model";

export const soundFiles: Record<MaterialType, string[]> = {
  [MaterialType.wood]: [
    "/sound/wood_01_a.wav",
    "/sound/wood_01_b.wav",
    "/sound/wood_01_c.wav",
    "/sound/wood_01_d.wav",
  ],
  [MaterialType.forest]: [
    "/sound/forest_01.wav",
    "/sound/forest_02.wav",
    "/sound/forest_03.wav",
  ],
  [MaterialType.snow]: [
    "/sound/snow_01_a.wav",
    "/sound/snow_01_b.wav",
    "/sound/snow_01_c.wav",
    "/sound/snow_01_d.wav",
  ],
  [MaterialType.marble]: [
    "/sound/marble_01.wav",
    "/sound/marble_02.wav",
    "/sound/marble_03.wav",
  ],
  [MaterialType.grass]: [
    "/sound/grass_01.wav",
    "/sound/grass_02.wav",
    "/sound/grass_03.wav",
  ],
  [MaterialType.stone]: [
    "/sound/stone_01_a.wav",
    "/sound/stone_01_b.wav",
    "/sound/stone_01_c.wav",
    "/sound/stone_01_d.wav",
    "/sound/stone_01_e.wav",
  ],
};

export const audioConfig: SoundConfig = {
  volume: 1,
  loop: false,
  rate: 1.5,
  detune: 1,
  delay: 0,
  seek: 0,
  mute: false,
};
