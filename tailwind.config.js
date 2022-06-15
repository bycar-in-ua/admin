import colors from "./src/colors.js";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
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
