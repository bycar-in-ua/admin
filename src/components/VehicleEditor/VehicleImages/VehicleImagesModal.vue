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
      :cdn-path-to-save="vehicleStore.brand?.slug || ''"
    />
    <div
      v-if="isFetching"
      class="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-gray-600 bg-opacity-50"
    >
      <n-spin size="medium" />
    </div>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VehicleImagesModal",
});
</script>

<script setup lang="ts">
import { h, ref } from "vue";
import { useI18n } from "vue-i18n";
import { NModal, NButton, NSpin } from "naive-ui";
import Images from "@/components/Images/index.vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";

const emit = defineEmits(["update:show"]);

const vehicleStore = useVehicleStore();
const { t } = useI18n();

const isFetching = ref(false);

const toolbarActions = [
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
        isFetching.value = true;
        await vehicleStore.saveSomething(selectedImages, "images");
        emit("update:show", false);
      } finally {
        isFetching.value = false;
      }
    },
  },
];
</script>
