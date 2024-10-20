import colors from "./src/colors.json" assert { type: "json" };

export default {
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
      maxHeight: {
        "1/4": "75vh",
        "4/5": "80vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
