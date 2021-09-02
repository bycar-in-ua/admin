<template>
  <n-config-provider :locale="ruRU" :date-locale="dateRuRU">
    <app-layout>
      <router-view />
    </app-layout>
  </n-config-provider>
</template>

<script>
import { NConfigProvider, ruRU, dateRuRU } from "naive-ui";

import AppLayout from "./layouts/AppLayout.vue";

export default {
  name: "App",
  setup() {
    return { ruRU, dateRuRU };
  },
  components: { AppLayout, NConfigProvider },
};
</script>
