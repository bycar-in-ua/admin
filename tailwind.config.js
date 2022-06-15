/* eslint-disable no-undef */
const colors = require("./src/colors.json");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  darkMode: "media", // or 'media' or 'class'
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.primary.lighten1,
          DEFAULT: colors.primary.default,
          dark: colors.primary.darken1,
        },
        secondary: {
          light: colors.secondary.lighten1,
          DEFAULT: colors.secondary.default,
          dark: colors.secondary.darken1,
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
