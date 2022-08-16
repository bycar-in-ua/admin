import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createI18n } from "vue-i18n";
import messages from "@/i18n";
import "./assets/global.css";
import "./assets/tailwind.css";
import { getCookie } from "./helpers/cookieHelpers";
import { createPinia } from "pinia";

const i18n = createI18n({
  legacy: false,
  locale: getCookie("lang") || "ru",
  fallbackLocale: "ru",
  messages,
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(store);
app.use(i18n);

app.mount("#app");
