/* eslint-disable no-undef */
const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./safelist.txt"],
  theme: {
    colors: {
      primary: colors.blue,
      secondary: colors.gray,
      success: colors.green,
      warning: colors.amber,
      danger: colors.red,
      info: colors.sky,
      white: "#ffffff",
      black: "#000000",
      light: colors.gray[100],
      dark: colors.gray[800],
      transparent: "transparent",
    },
  },
  plugins: [
    require("tailwind-safelist-generator")({
      path: "./safelist.txt",
      patterns: [
        "bg-{colors}",
        "hover:bg-{colors}",
        "text-{colors}",
        "disabled:text-{colors}",
        "hover:text-{colors}",
        "border-{colors}",
        "hover:border-{colors}",
        "focus-visible:ring-{colors}/40",
        // "focus:bg-{colors}",
        // "disabled:bg-{colors}",
        // "focus:text-{colors}",
        // "visited:text-{colors}",
        // "disabled:text-{colors}",
        // "placeholder:text-{colors}",
        // "focus:border-{colors}",
        // "disabled:border-{colors}",
        // "outline-{colors}",
        // "hover:outline-{colors}",
        // "focus:outline-{colors}",
        // "disabled:outline-{colors}",
        // "ring-{colors}",
        // "hover:ring-{colors}",
        // "disabled:ring-{colors}",
        // "rounded-{borderRadius}",
      ],
    }),
  ],
};
