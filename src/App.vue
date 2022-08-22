<template>
  <n-config-provider
    :locale="ruRU"
    :date-locale="dateRuRU"
    :theme-overrides="themeOverrides"
    :theme="theme"
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <app-layout v-if="authStore.isFetched">
            <router-view :key="locale" />
          </app-layout>
          <div v-else class="h-screen flex justify-center items-center">
            <n-spin :size="100" />
          </div>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<script setup lang="ts">
import { provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  NConfigProvider,
  ruRU,
  dateRuRU,
  darkTheme,
  NLoadingBarProvider,
  NNotificationProvider,
  NDialogProvider,
  NSpin,
} from "naive-ui";
import colors from "./colors.json";
import AppLayout from "./layouts/AppLayout.vue";
import useMemory from "./hooks/useMemory";
import { useAuthStore } from "@/stores/auth.store";

const themeOverrides = {
  common: {
    primaryColor: colors.primary.default,
    primaryColorHover: colors.primary.lighten1,
    primaryColorPressed: colors.primary.darken1,
    primaryColorSuppl: colors.primary.rgb,

    successColor: colors.success.default,
    successColorHover: colors.success.lighten1,
    successColorPressed: colors.success.darken1,
    successColorSuppl: colors.success.rgb,
  },
};

const authStore = useAuthStore();
const memory = useMemory();
const { locale } = useI18n();

const newDarkTheme = {
  ...darkTheme,
  Button: {
    ...darkTheme.Button,
    common: { ...darkTheme.Button.common, baseColor: "#ffffff" },
  },
};

document.title = "Admin | bycar.in.ua";

const theme = ref(memory.get("darkTheme", false) === "1" ? newDarkTheme : null);

const themeSwitcher = () => {
  if (theme.value === null) {
    memory.set("darkTheme", 1);
    theme.value = newDarkTheme;
  } else {
    memory.set("darkTheme", 0);
    theme.value = null;
  }
};

provide("themeSwitcher", themeSwitcher);
</script>
