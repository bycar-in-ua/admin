<script setup lang="ts">
import { useMemory } from "@/hooks/useMemory";
import Editor from "@tinymce/tinymce-vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";

const vehicleStore = useVehicleStore();
const memory = useMemory();

const darkTheme = memory.get("darkTheme", false);
</script>

<template>
  <Editor
    v-model="vehicleStore.car.description"
    api-key="bkij2k10jssrm5ez30czeck0fluycxbi0p1watets0n39u8n"
    :init="{
      height: 400,
      plugins: 'media',
      skin: darkTheme == '1' ? 'oxide-dark' : '',
      content_css: darkTheme == '1' ? 'dark' : '',
      iframe_template_callback: (data) =>
        `<div class='responsive-video-iframe-container'><iframe class='responsive-video-iframe' title='${data.title}' width='${data.width}' height='${data.height}' src='${data.source}'></iframe></div>`,
    }"
  />
</template>
