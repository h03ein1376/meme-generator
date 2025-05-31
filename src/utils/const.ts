import { SidebrSectionType } from "@/types/sidebar-section";
import { END_POINTS } from "./end-points";

export const BASE_URL = "https://memebox-app-bxjiq.ondigitalocean.app/api";

export const SIDEBAR_SECTIONS: SidebrSectionType[] = [
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
