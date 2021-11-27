<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import AppLayoutDefault from "./AppLayoutDefault";
export default {
  name: "AppLayout",
  data: () => ({
    layout: AppLayoutDefault,
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/layouts/${route.meta.layout}.vue`);
          this.layout = component?.default || AppLayoutDefault;
        } catch (e) {
          this.layout = AppLayoutDefault;
        }
      },
    },
  },
};
</script>

<script setup>
import { provide } from "vue";
import { useNotification } from "naive-ui";
const notification = useNotification();

provide("showNotification", (type, options) => {
  notification[type]({ duration: 7000, ...options });
});
</script>
