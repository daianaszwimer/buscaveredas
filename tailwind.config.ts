import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chrome: ["Tahoma", "Verdana", "Geneva", "sans-serif"],
      },
      colors: {
        // Windows XP / classic Minesweeper palette.
        face: "#c0c0c0",
        shadow: "#808080",
        highlight: "#ffffff",
        titlebar: {
          from: "#0058e6",
          mid: "#3d8bf5",
          to: "#0058e6",
        },
        led: {
          on: "#ff0000",
          off: "#3a0000",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
