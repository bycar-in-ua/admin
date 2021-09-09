<template>
  <div class="mb-6">
    <n-button type="primary">Создать</n-button>
  </div>
  <vehicles-table />
</template>

<script>
import { NButton } from "naive-ui";
import VehiclesTable from "@/components/Vehicles/VehiclesTable.vue";

export default {
  name: "VehiclesView",
  components: {
    NButton,
    VehiclesTable,
  },
};
</script>
