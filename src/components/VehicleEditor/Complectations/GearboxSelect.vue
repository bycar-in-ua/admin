<template>
  <n-select
    :options="[
      { value: 1, label: '6 АКПП FWD' },
      { value: 2, label: '6 АКПП AWD' },
    ]"
    size="small"
  />
</template>

<script>
import { NSelect } from "naive-ui";

export default {
  name: "GearboxSelect",
  components: {
    NSelect,
  },
};
</script>
