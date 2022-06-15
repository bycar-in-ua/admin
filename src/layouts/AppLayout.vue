<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
export default {
  name: "AppLayout",
};
</script>

<script setup>
import { watch, ref, markRaw } from "vue";
import { useRoute } from "vue-router";
import AppLayoutDefault from "./AppLayoutDefault.vue";
import LoginLayout from "./LoginLayout.vue";

const route = useRoute();

const layout = ref();

const layouts = {
  LoginLayout,
};

watch(
  () => route.meta?.layout,
  (metaLayout) => {
    layout.value = markRaw(layouts[metaLayout] || AppLayoutDefault);
  },
  { immediate: true }
);
</script>
