<script setup lang="ts">
import { onUnmounted, provide } from "vue";
import { useNotification } from "naive-ui";
import VehicleEditorTemplate from "@/components/common/EditorTemplate.vue";
import { useAvailableVehicleEditorStore } from "@/stores/availableVehicleEditor.store";
import CarTitle from "@/components/common/CarTitle.vue";
import { saveAvailableVehicleHandlerKey } from "@/AvailableVehicles";
import {
  SideColumn,
  ImagesEditor,
} from "@/AvailableVehicles/AvailableVehicleEditor";

const availalbeVehicleEditorStore = useAvailableVehicleEditorStore();
const notification = useNotification();

async function saveHandler() {
  try {
    await availalbeVehicleEditorStore.saveAvailableVehicle();

    notification.success({
      title: "Дані про автомобіль успішно збережено",
      duration: 3000,
    });
  } catch (error) {
    notification.warning({
      title: "Помилка при збереженні даних про автомобіль",
      content: String(error),
      duration: 3000,
    });
  }
}

/**
 * We have to use handle from the component instead of the store
 * because we need to show a notification after the save
 */
provide(saveAvailableVehicleHandlerKey, saveHandler);

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
