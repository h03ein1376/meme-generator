export enum Ratio {
  "3:1" = 3 / 1,
  "9:16" = 9 / 16,
  "16:9" = 16 / 9,
  "1:1" = 1 / 1,
}

export type RatioItem = {
  title: string;
  icon: string;
  ratio: Ratio;
};
