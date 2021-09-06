<template>
  <n-config-provider
    :locale="ruRU"
    :date-locale="dateRuRU"
    :theme-overrides="themeOverrides"
  >
    <n-loading-bar-provider>
      <n-notification-provider>
        <app-layout v-if="isUserFetched">
          <router-view />
        </app-layout>
        <div v-else class="h-screen flex justify-center items-center">
          <n-spin :size="100" />
        </div>
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
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
// import { FETCH_USER } from "./store/modules/auth/actionTypes";

export default {
  name: "App",
  setup() {
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
    // const router = useRouter();

    const isUserFetched = computed(() => store.state.auth.isFetched);

    return {
      ruRU,
      dateRuRU,
      themeOverrides,
      darkTheme,
      isUserFetched,
    };
  },
  components: {
    AppLayout,
    NConfigProvider,
    NLoadingBarProvider,
    NNotificationProvider,
    NSpin,
  },
};
</script>
