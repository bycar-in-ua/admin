<template>
  <div v-if="isFetched" class="flex relative">
    <n-scrollbar class="pr-6 mr-1" style="flex: 0 0 75%; max-height: 86vh">
      <VehicleTitle />
      <DescriptionEditor />
      <GeneralOptions />
      <Complectations />
      <Engines />
      <Transmissions />
      <VehicleImages />
      <VehicleColors />
    </n-scrollbar>
    <SideColumn style="flex: 0 0 24%" />
  </div>
  <VahicleEditorSkeleton v-else />
</template>

<script>
export default {
  name: "VehicleEditor",
};
</script>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useI18n } from "vue-i18n";

import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  FETCH_CAR,
  PURGE_CAR_EDITOR,
} from "@/store/modules/carEditor/actionTypes";

import { NScrollbar, useDialog } from "naive-ui";
import SideColumn from "./SideColumn";
import VehicleTitle from "./VehicleTitle";
import DescriptionEditor from "./DescriptionEditor";
import GeneralOptions from "./GeneralOptions";
import Complectations from "./Complectations";
import Engines from "./Engines";
import Transmissions from "./Transmissions";
import VehicleImages from "./VehicleImages";
import VehicleColors from "./VehicleColors";
import VahicleEditorSkeleton from "./Skeleton";
import { FETCH_OPTION_CATEGORIES } from "@/store/modules/library/options/actionTypes";

const store = useStore();
const router = useRouter();
const { t } = useI18n();
const dialog = useDialog();

store.dispatch(
  carEditorNamespace(FETCH_CAR),
  router.currentRoute.value.params.slug
);
store.dispatch(FETCH_OPTION_CATEGORIES);

const isFetched = computed(() => store.state.carEditor.isFetched);
const isEdited = computed(() => store.state.carEditor.isEdited);

onBeforeRouteLeave((to) => {
  if (isEdited.value) {
    dialog.warning({
      title: t("notifications.confirmations.title"),
      content: t("notifications.vehicle.beforeLeaveEditor.message"),
      positiveText: t("notifications.vehicle.beforeLeaveEditor.positiveAnswer"),
      negativeText: t("notifications.vehicle.beforeLeaveEditor.negativeAnswer"),
      onPositiveClick: () => {
        store.dispatch(carEditorNamespace(PURGE_CAR_EDITOR));
        router.push(to);
      },
    });
    return false;
  }
  store.dispatch(carEditorNamespace(PURGE_CAR_EDITOR));
});
</script>
