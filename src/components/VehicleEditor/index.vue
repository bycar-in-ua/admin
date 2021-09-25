<template>
  <div v-if="isFetched" class="flex relative">
    <div class="pr-6" style="flex: 0 0 75%" :nativeScrollbar="false">
      <vehicle-title />
      <description-editor />
      <Complectations />
      <Engines />
      <Transmissions />
    </div>
    <div style="flex: 0 0 25%">
      <side-column />
    </div>
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

import SideColumn from "./SideColumn";
import VehicleTitle from "./VehicleTitle";
import DescriptionEditor from "./DescriptionEditor";
import Complectations from "./Complectations";
import Engines from "./Engines";
import Transmissions from "./Transmissions";
import VahicleEditorSkeleton from "./Skeleton";

const store = useStore();
const route = useRoute();
store.dispatch(carEditorNamespace(FETCH_CAR), route.params.id);

const isFetched = computed(() => store.state.carEditor.isFetched);
</script>

<style>
.editor-scroll {
  max-height: calc(100vh - 10rem);
}
</style>
