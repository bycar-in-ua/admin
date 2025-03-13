<script setup lang="ts">
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDialog } from "naive-ui";
import CarTitle from "@/components/common/CarTitle.vue";
import VehicleEditorTemplate from "@/components/common/EditorTemplate.vue";
import SideColumn from "@/VehicleEditor/SideColumn.vue";
import DescriptionEditor from "@/VehicleEditor/DescriptionEditor.vue";
import GeneralOptions from "@/VehicleEditor/GeneralOptions/index.vue";
import Complectations from "@/VehicleEditor/Complectations/index.vue";
import Engines from "@/VehicleEditor/Engines/index.vue";
import Transmissions from "@/VehicleEditor/Transmissions/index.vue";
import VehicleImages from "@/VehicleEditor/VehicleImages/index.vue";
import VehicleColors from "@/VehicleEditor/VehicleColors/index.vue";
import { useVehicleEditorStore } from "@/stores/vehicleEditor";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useEditorStore } from "@/stores/vehicleEditor/editor.store";

const vehicleEditorStore = useVehicleEditorStore();
const vehicleStore = useVehicleStore();
const editoreState = useEditorStore();
const router = useRouter();
const { t } = useI18n();
const dialog = useDialog();

vehicleEditorStore.fetchCar(String(router.currentRoute.value.params.slug));

onBeforeRouteLeave((to) => {
  if (editoreState.isModified) {
    dialog.warning({
      title: t("notifications.confirmations.title"),
      content: t("notifications.vehicle.beforeLeaveEditor.message"),
      positiveText: t("notifications.vehicle.beforeLeaveEditor.positiveAnswer"),
      negativeText: t("notifications.vehicle.beforeLeaveEditor.negativeAnswer"),
      onPositiveClick: () => {
        vehicleEditorStore.purgeEditor();
        vehicleEditorStore.$dispose();
        router.push(to);
      },
    });
    return false;
  }
  vehicleEditorStore.purgeEditor();
  vehicleEditorStore.$dispose();
});
</script>

<template>
  <VehicleEditorTemplate :loading="!editoreState.initiallyFetched">
    <CarTitle :car="vehicleStore.car" />
    <DescriptionEditor />
    <GeneralOptions />
    <Complectations />
    <Engines />
    <Transmissions />
    <VehicleImages />
    <VehicleColors />

    <template #sidebar>
      <SideColumn class="basis-1/4" />
    </template>
  </VehicleEditorTemplate>
</template>
