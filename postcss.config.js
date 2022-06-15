import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindNesting from "@tailwindcss/nesting";
import tailwindConfig from "./tailwind.config.js";

export default {
  plugins: [tailwindNesting, tailwind(tailwindConfig), autoprefixer],
};
