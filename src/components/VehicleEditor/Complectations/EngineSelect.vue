<template>
  <n-select
    :options="[
      { value: 1, label: '2.0 Skyactiv' },
      { value: 2, label: '2.5 Skyactiv Turbo' },
    ]"
    size="small"
  />
</template>

<script>
import { NSelect } from "naive-ui";

export default {
  name: "EngineSelect",
  components: {
    NSelect,
  },
};
</script>
