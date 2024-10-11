export enum MaterialType {
  wood = "wood",
  forest = "forest",
  snow = "snow",
  marble = "marble",
  grass = "grass",
  stone = "stone",
}

export interface SoundArea {
  name: string;
  y: number;
  x: number;
  width?: number;
  height?: number;
  material?: MaterialType;
}
