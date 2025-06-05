import { SidebrSection } from "@/types/sidebar-section";
import { END_POINTS } from "./end-points";
import { Ratio, RatioItem } from "@/types/ratio";

export const BASE_URL = "https://memebox-app-bxjiq.ondigitalocean.app/api";

export const CANVAS_BG_COLOR = "#ebeaed";

export const SIDEBAR_SECTIONS: SidebrSection[] = [
  {
    title: "memes",
    homeUrl: END_POINTS.HOME_MEMES,
    url: END_POINTS.MEMES,
    type: "template",
  },
  {
    title: "banners",
    homeUrl: END_POINTS.HOME_BANNERS,
    url: END_POINTS.BANNERS,
    type: "template",
  },
  {
    title: "wallpapers",
    homeUrl: END_POINTS.HOME_WALLPAPERS,
    url: END_POINTS.WALLPAPERS,
    type: "template",
  },
  {
    title: "sparky",
    homeUrl: END_POINTS.HOME_SPARKY,
    url: END_POINTS.SPARKY,
    type: "sticker",
  },
  {
    title: "void",
    homeUrl: END_POINTS.HOME_VOID,
    url: END_POINTS.VOID,
    type: "sticker",
  },
  {
    title: "trump",
    homeUrl: END_POINTS.HOME_TRUMP,
    url: END_POINTS.TRUMP,
    type: "sticker",
  },
  {
    title: "billy cat",
    homeUrl: END_POINTS.HOME_BILLY_CAT,
    url: END_POINTS.BILLY_CAT,
    type: "sticker",
  },
];

export const RATIO_ITEMS: RatioItem[] = [
  {
    title: "Twitter Banner",
    shortTitle: "X Banner",
    icon: "icon-[iconoir--twitter]",
    ratio: Ratio["3:1"],
  },
  {
    title: "Mobile Wallpaper",
    shortTitle: "Mobile",
    icon: "icon-[iconoir--smartphone-device]",
    ratio: Ratio["9:16"],
  },
  {
    title: "Desktop Wallpaper",
    shortTitle: "Desktop",
    icon: "icon-[iconoir--apple-imac-2021]",
    ratio: Ratio["16:9"],
  },
  {
    title: "Square",
    shortTitle: "Square",
    icon: "icon-[iconoir--square]",
    ratio: Ratio["1:1"],
  },
];
