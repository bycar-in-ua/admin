<template>
  <n-modal
    :show="show"
    preset="card"
    class="max-w-6xl"
    @update:show="closeCallback"
  >
    <Images
      :is-selectable="true"
      :toolbar-actions="toolbarActions"
      :preselected-images="existingImages"
    />
    <div
      v-if="isFetching"
      class="
        absolute
        left-0
        right-0
        top-0
        bottom-0
        flex
        justify-center
        items-center
        bg-gray-600 bg-opacity-50
      "
    >
      <n-spin size="medium" />
    </div>
  </n-modal>
</template>

<script>
export default {
  name: "VehicleImagesModal",
};
</script>

<script setup>
import { defineProps, h, ref, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NModal, NButton, NSpin } from "naive-ui";
import Images from "@/components/Images";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { SAVE_CAR_IMAGES } from "@/store/modules/carEditor/actionTypes";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  closeCallback: {
    type: Function,
  },
});

const store = useStore();
const { t } = useI18n();

const isFetching = ref(false);
const existingImages = computed(
  () => store.getters[carEditorNamespace("getCarImagesIds")]
);

const closeCallback = (val) => {
  props.closeCallback(val);
};

const toolbarActions = [
  {
    component: h(
      NButton,
      {
        type: "primary",
        class: "ml-4",
      },
      t("vehicle.images.saveVehicleImages")
    ),
    clickCallback: async (selectedImages) => {
      try {
        isFetching.value = true;
        await store.dispatch(
          carEditorNamespace(SAVE_CAR_IMAGES),
          selectedImages
        );
        props.closeCallback(false);
      } finally {
        isFetching.value = false;
      }
    },
  },
];
</script>
