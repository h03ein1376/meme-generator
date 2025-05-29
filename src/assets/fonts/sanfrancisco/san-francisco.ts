import localFont from "next/font/local";

export const sanFrancisco = localFont({
  src: [
    {
      path: "./sanfranciscodisplay-ultralight-webfont.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./sanfranciscodisplay-thin-webfont.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./sanfranciscodisplay-regular-webfont.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./sanfranciscodisplay-medium-webfont.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./sanfranciscodisplay-semibold-webfont.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./sanfranciscodisplay-bold-webfont.woff",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-sf",
});
