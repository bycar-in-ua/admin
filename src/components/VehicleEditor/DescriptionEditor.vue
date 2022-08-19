<template>
  <editor
    v-model="vehicleStore.description"
    api-key="bkij2k10jssrm5ez30czeck0fluycxbi0p1watets0n39u8n"
    :init="{
      height: 400,
      menubar: false,
      skin: darkTheme == '1' ? 'oxide-dark' : '',
      content_css: darkTheme == '1' ? 'dark' : '',
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMemory } from "@/hooks/useMemory";
import Editor from "@tinymce/tinymce-vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";

export default defineComponent({
  name: "DescriptionEditor",
  components: {
    Editor,
  },
  setup() {
    const vehicleStore = useVehicleStore();
    const memory = useMemory();

    const darkTheme = memory.get("darkTheme", false);

    return {
      vehicleStore,
      darkTheme,
    };
  },
});
</script>
