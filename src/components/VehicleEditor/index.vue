<template>
  <div v-if="isFetched" class="flex relative">
    <div class="pr-6" style="flex: 0 0 75%" :nativeScrollbar="false">
      <vehicle-title />
      <description-editor />
      <Complectations />
      <Engines />
      <Gearboxes />
    </div>
    <div style="flex: 0 0 25%">
      <side-column />
    </div>
  </div>
  <vahicle-editor-skeleton v-else />
</template>

<script>
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
import Gearboxes from "./Gearboxes";
import VahicleEditorSkeleton from "./Skeleton";

export default {
  name: "VehicleEditor",
  setup() {
    const store = useStore();
    const route = useRoute();
    store.dispatch(carEditorNamespace(FETCH_CAR), route.params.id);

    const isFetched = computed(() => store.state.carEditor.isFetched);

    return {
      isFetched,
    };
  },
  components: {
    VehicleTitle,
    DescriptionEditor,
    Complectations,
    Engines,
    Gearboxes,
    SideColumn,
    VahicleEditorSkeleton,
  },
};
</script>

<style>
.editor-scroll {
  max-height: calc(100vh - 10rem);
}
</style>
