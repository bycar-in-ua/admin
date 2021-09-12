<template>
  <create-vehicle-button />
  <vehicles-table />
</template>

<script>
import VehiclesTable from "@/components/Vehicles/VehiclesTable.vue";
import CreateVehicleButton from "@/components/Vehicles/CreateVehicleButton.vue";

export default {
  name: "VehiclesView",
  components: {
    VehiclesTable,
    CreateVehicleButton,
  },
};
</script>
