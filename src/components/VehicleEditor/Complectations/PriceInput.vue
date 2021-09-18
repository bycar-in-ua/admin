<template>
  <n-input-number :show-button="false" :value="price" size="small">
    <template #prefix> $ </template>
  </n-input-number>
</template>

<script>
import { NInputNumber } from "naive-ui";

export default {
  name: "PriceInput",
  props: ["price"],
  components: {
    NInputNumber,
  },
};
</script>
