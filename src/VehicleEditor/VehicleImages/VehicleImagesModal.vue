<script setup lang="ts">
import { h } from "vue";
import { useI18n } from "vue-i18n";
import { NModal, NButton } from "naive-ui";
import { Images, type ToolbarAction } from "@/components/Images";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useImagesStore } from "@/stores/images.store";
import { Image } from "@bycar-in-ua/sdk";

defineOptions({
  name: "VehicleImagesModal",
});

const open = defineModel<boolean>("open");

const vehicleStore = useVehicleStore();
const imagesStore = useImagesStore();
const { t } = useI18n();

imagesStore.fetchImages(1);

const toolbarActions: ToolbarAction[] = [
  {
    component: h(
      NButton,
      {
        type: "primary",
        class: "mr-4",
      },
      () => t("save")
    ),
    clickCallback: (selectedImages: Image[]) => {
      vehicleStore.handleSelectedImages(selectedImages);
      open.value = false;
    },
  },
];
</script>

<template>
  <n-modal preset="card" class="max-w-6xl" v-model:show="open">
    <Images
      :is-selectable="true"
      :toolbar-actions="toolbarActions"
      :preselected-images="vehicleStore.car.images.map(({ image }) => image)"
      :cdn-path-to-save="vehicleStore.car.brand?.slug || ''"
    />
  </n-modal>
</template>
