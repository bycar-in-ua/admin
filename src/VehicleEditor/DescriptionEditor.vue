<script setup lang="ts">
import { ref } from "vue";
import { useMemory } from "@/hooks/useMemory";
import Editor from "@tinymce/tinymce-vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import AIButton from "@/components/common/AIButton.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const vehicleStore = useVehicleStore();
const memory = useMemory();

const darkTheme = memory.get("darkTheme", false);

const loading = ref(false);

const generateAction = async () => {
  loading.value = true;

  try {
    await vehicleStore.generateDescription(t);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <Editor
      v-model="vehicleStore.car.description"
      api-key="bkij2k10jssrm5ez30czeck0fluycxbi0p1watets0n39u8n"
      :init="{
        height: 400,
        plugins: 'media',
        skin: darkTheme == '1' ? 'oxide-dark' : 'oxide',
        content_css: darkTheme == '1' ? 'dark' : '',
        iframe_template_callback: (data) =>
          `<div class='responsive-video-iframe-container'><iframe class='responsive-video-iframe' title='${data.title}' width='${data.width}' height='${data.height}' src='${data.source}'></iframe></div>`,
      }"
    />

    <div class="flex items-center justify-end">
      <div
        class="flex items-center justify-end gap-2 border border-solid border-gray-200 rounded-b-lg border-t-0 mr-2 p-1"
      >
        <AIButton quaternary size="small" @click="generateAction" :loading />
      </div>
    </div>
  </div>
</template>
