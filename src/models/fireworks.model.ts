export enum FireworkColors {
  RED = "red",
  PINK = "pink",
  GREEN = "green",
  YELLOW = "yellow",
  PURPLE = "purple",
  BLUE = "blue",
}

export interface FireworkConfig {
  color: FireworkColors;
  x: number;
  y: number;
}
