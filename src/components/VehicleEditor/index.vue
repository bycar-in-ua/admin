<template>
  <div v-if="isFetched" class="flex relative">
    <n-scrollbar class="pr-6 mr-1" style="flex: 0 0 75%; max-height: 85vh">
      <vehicle-title />
      <description-editor />
      <general-options />
      <Complectations />
      <Engines />
      <Transmissions />
      <VehicleImages />
      <VehicleColors />
    </n-scrollbar>
    <side-column style="flex: 0 0 24%" />
  </div>
  <vahicle-editor-skeleton v-else />
</template>

<script>
export default {
  name: "VehicleEditor",
};
</script>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import { carEditorNamespace } from "@/store/modules/carEditor";
import { FETCH_CAR } from "@/store/modules/carEditor/actionTypes";

import { NScrollbar } from "naive-ui";
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
import {
  FETCH_OPTIONS,
  FETCH_OPTION_CATEGORIES,
} from "@/store/modules/library/actionTypes";

const store = useStore();
const route = useRoute();
store.dispatch(carEditorNamespace(FETCH_CAR), route.params.id);
store.dispatch(FETCH_OPTION_CATEGORIES);
store.dispatch(FETCH_OPTIONS);

const isFetched = computed(() => store.state.carEditor.isFetched);
</script>
