<script setup lang="ts">
import VehicleEditorTemplate from "@/components/common/VehicleEditorTemplate.vue";
import { useAvailableVehicleEditorStore } from "@/stores/availableVehicleEditor.store";
import CarTitle from "@/components/common/CarTitle.vue";
import {
  SideColumn,
  ImagesEditor,
} from "@/AvailableVehicles/AvailableVehicleEditor";

const availalbeVehicleEditorStore = useAvailableVehicleEditorStore();
</script>

<template>
  <VehicleEditorTemplate :loading="availalbeVehicleEditorStore.carFetching">
    <CarTitle :car="availalbeVehicleEditorStore.car?.vehicle" />
    <ImagesEditor />

    <template #sidebar>
      <SideColumn />
    </template>
  </VehicleEditorTemplate>
</template>
