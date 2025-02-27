import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import messages from "@/i18n";
import "./assets/global.css";
import "./assets/tailwind.css";
import { getCookie } from "./helpers/cookieHelpers";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";

const i18n = createI18n({
  legacy: false,
  locale: getCookie("lang") || "ua",
  fallbackLocale: "ua",
  messages,
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
});

app.mount("#app");
