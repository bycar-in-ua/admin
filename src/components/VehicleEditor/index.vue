<template>
  <div v-if="editoreState.initiallyFetched" class="flex gap-4 relative">
    <n-scrollbar class="basis-3/4 pr-4" style="max-height: calc(100vh - 100px)">
      <VehicleTitle />
      <DescriptionEditor />
      <GeneralOptions />
      <Complectations />
      <Engines />
      <Transmissions />
      <VehicleImages />
      <VehicleColors />
    </n-scrollbar>
    <SideColumn class="basis-1/4" />
  </div>
  <VahicleEditorSkeleton v-else />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "VehicleEditor",
});
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useI18n } from "vue-i18n";
import { NScrollbar, useDialog } from "naive-ui";
import SideColumn from "./SideColumn.vue";
import VehicleTitle from "./VehicleTitle.vue";
import DescriptionEditor from "./DescriptionEditor.vue";
import GeneralOptions from "./GeneralOptions/index.vue";
import Complectations from "./Complectations/index.vue";
import Engines from "./Engines/index.vue";
import Transmissions from "./Transmissions/index.vue";
import VehicleImages from "./VehicleImages/index.vue";
import VehicleColors from "./VehicleColors/index.vue";
import VahicleEditorSkeleton from "./Skeleton.vue";
import { FETCH_OPTION_CATEGORIES } from "@/store/modules/library/options/actionTypes";
import { useVehicleEditorStore } from "@/stores/vehicleEditor";
import { useEditorStore } from "@/stores/vehicleEditor/editor.store";

const vehicleEditorStore = useVehicleEditorStore();
const editoreState = useEditorStore();
const store = useStore();
const router = useRouter();
const { t } = useI18n();
const dialog = useDialog();

vehicleEditorStore.fetchCar(String(router.currentRoute.value.params.slug));

store.dispatch(FETCH_OPTION_CATEGORIES);

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
