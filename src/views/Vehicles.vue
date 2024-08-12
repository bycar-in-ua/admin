<template>
  <vehicles-table />
</template>

<script setup lang="ts">
import VehiclesTable from "@/components/Vehicles/VehiclesTable.vue";
import { useBrandsStore } from "@/stores/brands.store";
import { useCarsStore } from "@/stores/cars.store";

await Promise.all([useBrandsStore().fetchBrands(), useCarsStore().fetchCars()]);
</script>
