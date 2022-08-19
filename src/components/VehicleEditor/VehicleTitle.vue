<template>
  <n-h3 v-text="title" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NH3 } from "naive-ui";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";

export default defineComponent({
  name: "VehicleTitle",
  components: {
    NH3,
  },
  setup() {
    const vehicleStore = useVehicleStore();

    return {
      title: vehicleStore.getVehicleTitle,
    };
  },
});
</script>
