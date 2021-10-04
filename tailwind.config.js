const colors = require("./src/colors.js");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
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
