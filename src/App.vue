<template>
  <n-config-provider
    :locale="ruRU"
    :date-locale="dateRuRU"
    :theme-overrides="themeOverrides"
    :theme="theme"
  >
    <n-loading-bar-provider>
      <n-notification-provider>
        <app-layout v-if="isUserFetched">
          <router-view :key="locale" />
        </app-layout>
        <div v-else class="h-screen flex justify-center items-center">
          <n-spin :size="100" />
        </div>
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
export default {
  name: "App",
};
</script>

<script setup>
import { computed, provide, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {
  NConfigProvider,
  ruRU,
  dateRuRU,
  darkTheme,
  NLoadingBarProvider,
  NNotificationProvider,
  NSpin,
} from "naive-ui";
import colors from "./colors";
import AppLayout from "./layouts/AppLayout.vue";
import { FETCH_VEHICLE_TYPES } from "./store/modules/library/actionTypes";
import useMemory from "./hooks/useMemory";

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

const store = useStore();
const memory = useMemory();
const { locale } = useI18n();

const newDarkTheme = {
  ...darkTheme,
  Button: {
    ...darkTheme.Button,
    common: { ...darkTheme.Button.common, baseColor: "#ffffff" },
  },
};

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

store.dispatch(FETCH_VEHICLE_TYPES);

const isUserFetched = computed(() => store.state.auth.isFetched);
</script>
