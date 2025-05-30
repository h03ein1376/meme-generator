"use client";

import React, { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { useTheme } from "next-themes";

export type Theme = "light" | "dark";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div id="switchThemeMode" className={clsx("h-7 lg:h-auto", theme)}>
      <label className="relative flex items-center justify-center w-16 h-8 rounded-full cursor-pointer transition-all duration-500 ease-in-out bg-gradient-to-b from-[#73bbff] to-[#a2d1fd]">
        <input
          value={theme ?? "false"}
          onChange={toggleTheme}
          type="checkbox"
          id="switch"
          className="hidden"
        />
        <div
          className={clsx(
            "absolute w-full h-full rounded-full transition-all duration-500 ease-in-out",
            "bg-gradient-to-t from-[#2b3347] to-[#181d27]",
            theme === "dark" ? "opacity-100" : "opacity-0"
          )}
        ></div>

        <div
          className={clsx(
            "absolute -top-[2px] -left-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] rounded-full z-[-1] transition-all duration-500 ease-in-out",
            "bg-gradient-to-b from-[#a2d1fd] to-[#cde7ff]"
          )}
        >
          <div
            className={clsx(
              "absolute top-0 left-0 w-full h-full rounded-full transition-all duration-500 ease-in-out",
              "bg-gradient-to-b from-black to-[#6c7384]",
              theme === "dark" ? "opacity-100" : "opacity-0"
            )}
          ></div>
        </div>

        <div
          className={clsx(
            "absolute rounded-full transition-all duration-500 ease-in-out z-[1]",
            "h-6 w-6 lg:h-[26px] lg:w-[26px]",
            theme === "dark"
              ? "left-[calc(100%-26px-5px)] bg-[#dee5f3] shadow-[0px_0px_51.7px_0px_#dee5f3]"
              : "left-[5px] bg-[#ffc187] shadow-[0px_0px_11.7px_0px_#ffc187,0px_0px_20px_0px_#ffc18768,-2px_-2px_5px_0px_#ffab5c_inset]"
          )}
        >
          <div
            className={clsx(
              "absolute top-[1px] left-[1px] w-[75%] h-[75%] rounded-full transition-all duration-500 ease-in-out",
              theme === "dark" ? "bg-[#565c6b]" : "bg-[#ffc187]"
            )}
          ></div>
        </div>

        <div className="relative h-full w-full overflow-hidden rounded-full">
          <img
            src="/cloud.svg"
            alt=""
            className={clsx(
              "absolute w-[60%] transition-all duration-500 ease-in-out",
              theme === "dark"
                ? "bottom-[-35%] left-[-110px]"
                : "bottom-[-50%] left-0"
            )}
          />
          <img
            src="/cloud.svg"
            alt=""
            className={clsx(
              "absolute w-[60%] transition-all ease-in-out",
              theme === "dark"
                ? "bottom-[-15%] left-[-110px] duration-700"
                : "bottom-[-35%] left-[15px] duration-500"
            )}
          />
          <img
            src="/cloud.svg"
            alt=""
            className={clsx(
              "absolute w-[60%] transition-all duration-500 ease-in-out",
              theme === "dark"
                ? "bottom-[-15%] right-[-110px]"
                : "bottom-[-35%] right-[-5px]"
            )}
          />
          <img
            src="/cloud.svg"
            alt=""
            className={clsx(
              "absolute w-[60%] transition-all ease-in-out",
              theme === "dark"
                ? "bottom-[-5%] right-[-110px] duration-700"
                : "bottom-[-10%] right-[-17px] duration-500"
            )}
          />
          <img
            src="/stars.svg"
            alt=""
            className={clsx(
              "absolute left-0 transform -translate-y-1/2 pointer-events-none transition-all duration-500 ease-in-out",
              theme === "dark" ? "top-1/2" : "top-[150%]"
            )}
          />
        </div>
      </label>
    </div>
  );
};
