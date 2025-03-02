<script setup lang="ts">
import { onUnmounted, provide } from "vue";
import { useNotification } from "naive-ui";
import VehicleEditorTemplate from "@/components/common/EditorTemplate.vue";
import { useAvailableVehicleEditorStore } from "@/stores/availableVehicleEditor.store";
import CarTitle from "@/components/common/CarTitle.vue";
import {
  SideColumn,
  ImagesEditor,
} from "@/AvailableVehicles/AvailableVehicleEditor";

const availalbeVehicleEditorStore = useAvailableVehicleEditorStore();
const notification = useNotification();

async function saveHandler() {
  await availalbeVehicleEditorStore.saveAvailableVehicle();

  notification.success({
    title: "Дані про автомобіль успішно збережено",
    duration: 3000,
  });
}

provide("saveAvailableVehicle", saveHandler);

onUnmounted(() => {
  availalbeVehicleEditorStore.$dispose();
});
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
