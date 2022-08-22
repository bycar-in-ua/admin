<template>
  <n-modal
    preset="card"
    class="max-w-6xl"
    :on-update:show="(val) => $emit('update:show', val)"
  >
    <Images
      :is-selectable="true"
      :toolbar-actions="toolbarActions"
      :preselected-images="vehicleStore.carImagesIds"
      :cdn-path-to-save="vehicleStore.car.brand?.slug || ''"
    />
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VehicleImagesModal",
});
</script>

<script setup lang="ts">
import { h } from "vue";
import { useI18n } from "vue-i18n";
import { NModal, NButton } from "naive-ui";
import Images, { type ToolbarAction } from "@/components/Images/index.vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useImagesStore } from "@/stores/images.store";

const emit = defineEmits(["update:show"]);

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
      t("vehicle.images.saveVehicleImages")
    ),
    clickCallback: async (selectedImages) => {
      try {
        imagesStore.isFetching = true;
        await vehicleStore.saveSomething(selectedImages, "images");
        emit("update:show", false);
      } finally {
        imagesStore.isFetching = false;
      }
    },
  },
];
</script>
