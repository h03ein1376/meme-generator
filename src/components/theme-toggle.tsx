"use client";

import React from "react";
import { useTheme } from "next-themes";

export type Theme = "light" | "dark";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div id="switchThemeMode" className="h-7 lg:h-auto">
      <label className="relative flex items-center justify-center w-16 h-8 rounded-full cursor-pointer transition-all duration-500 ease-in-out bg-gradient-to-b from-[#73bbff] to-[#a2d1fd]">
        <input
          onChange={toggleTheme}
          type="checkbox"
          id="switch"
          className="hidden"
        />

        <div className="absolute w-full h-full rounded-full transition-all duration-500 ease-in-out bg-gradient-to-t from-[#2b3347] to-[#181d27] opacity-0 dark:opacity-100" />

        <div className="absolute -top-[2px] -left-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] rounded-full z-[-1] transition-all duration-500 ease-in-out bg-gradient-to-b from-[#a2d1fd] to-[#cde7ff]">
          <div className="absolute top-0 left-0 w-full h-full rounded-full transition-all duration-500 ease-in-out bg-gradient-to-b from-black to-[#6c7384] opacity-0 dark:opacity-100" />
        </div>

        <div className="absolute rounded-full transition-all duration-500 ease-in-out z-[1] h-6 w-6 lg:h-[26px] lg:w-[26px] left-[5px] bg-[#ffc187] shadow-[0px_0px_11.7px_0px_#ffc187,0px_0px_20px_0px_#ffc18768,-2px_-2px_5px_0px_#ffab5c_inset] dark:left-[calc(100%-26px-5px)] dark:bg-[#dee5f3] dark:shadow-[0px_0px_51.7px_0px_#dee5f3]">
          <div className="absolute top-[1px] left-[1px] w-[75%] h-[75%] rounded-full transition-all duration-500 ease-in-out bg-[#ffc187] dark:bg-[#565c6b]" />
        </div>

        <div className="relative h-full w-full overflow-hidden rounded-full">
          <img
            src="/cloud.svg"
            alt=""
            className="absolute w-[60%] transition-all duration-500 ease-in-out bottom-[-50%] left-0 dark:bottom-[-35%] dark:left-[-110px]"
          />
          <img
            src="/cloud.svg"
            alt=""
            className="absolute w-[60%] transition-all duration-500 ease-in-out bottom-[-35%] left-[15px] dark:bottom-[-15%] dark:left-[-110px] dark:duration-700"
          />
          <img
            src="/cloud.svg"
            alt=""
            className="absolute w-[60%] transition-all duration-500 ease-in-out bottom-[-35%] right-[-5px] dark:bottom-[-15%] dark:right-[-110px]"
          />
          <img
            src="/cloud.svg"
            alt=""
            className="absolute w-[60%] transition-all duration-500 ease-in-out bottom-[-10%] right-[-17px] dark:bottom-[-5%] dark:right-[-110px] dark:duration-700"
          />
          <img
            src="/stars.svg"
            alt=""
            className="absolute left-0 transform -translate-y-1/2 pointer-events-none transition-all duration-500 ease-in-out top-[150%] dark:top-1/2"
          />
        </div>
      </label>
    </div>
  );
};
