<script setup lang="ts">
import { computed } from "vue";
import { NH3 } from "naive-ui";
import { Vehicle } from "@bycar-in-ua/sdk";

defineOptions({
  name: "CarTitle",
});

const props = defineProps<{
  car?: Vehicle | null;
}>();

const title = computed(() => {
  const titleParts = [];

  titleParts.push(props.car?.brand?.displayName);

  titleParts.push(props.car?.model);

  titleParts.push(props.car?.yearFrom);

  if (props.car?.yearTo) {
    titleParts.push("-");
    titleParts.push(props.car.yearTo);
  }

  return titleParts.join(" ");
});
</script>

<template>
  <NH3>{{ title }}</NH3>
</template>
