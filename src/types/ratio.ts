export enum Ratio {
  "3:1" = 3 / 1,
  "9:16" = 9 / 16,
  "16:9" = 16 / 9,
  "1:1" = 1 / 1,
}

export type RatioItem = {
  title: string;
  shortTitle: string;
  icon: string;
  ratio: Ratio;
};

export const getRatioKey = (value: Ratio): string | undefined => {
  return Object.keys(Ratio).find(
    (key) => Ratio[key as keyof typeof Ratio] === value
  );
};
