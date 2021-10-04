<template>
  <vehicle-editor />
</template>

<script>
import VehicleEditor from "@/components/VehicleEditor";
import { mapActions } from "vuex";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { PURGE_CAR_EDITOR } from "@/store/modules/carEditor/actionTypes";

export default {
  name: "EditVehicleView",
  components: {
    VehicleEditor,
  },
  methods: {
    ...mapActions({
      purgeEditor: carEditorNamespace(PURGE_CAR_EDITOR),
    }),
  },
  beforeRouteLeave() {
    this.purgeEditor();
  },
};
</script>
