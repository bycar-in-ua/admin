<template>
  <div class="flex my-4">
    <n-button
      v-if="selectable && discardable"
      type="primary"
      class="mr-4"
      @click="setUnselectable"
      :disabled="isFetching"
    >
      {{ t("discard") }}
    </n-button>
    <n-button
      v-if="!selectable"
      class="mr-4"
      type="primary"
      ghost
      @click="setSelectable"
    >
      {{ t("choose", 2) }}
    </n-button>

    <component
      v-for="(action, index) in additionalActions"
      :key="index"
      :is="action.component"
      @click="action.clickCallback(selectedImages)"
    />
    <template v-if="selectedImages.length">
      <n-button
        type="error"
        class="mr-4"
        :disabled="isFetching"
        :loading="isFetching"
        @click="deleteHandler"
      >
        {{ t("delete") }}
      </n-button>
    </template>

    <AddNewImage class="ml-auto" />
  </div>
</template>

<script>
export default {
  name: "ImagesToolBar",
};
</script>

<script setup>
import { inject, defineProps, ref, provide } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import AddNewImage from "./AddNewImage";
import { NButton } from "naive-ui";
import apiClient from "@/helpers/apiClient";
import { FETCH_IMAGES } from "@/store/modules/library/images/actionTypes";

const store = useStore();
const { t } = useI18n();

const props = defineProps({
  selectable: {
    type: Boolean,
    default: false,
  },
  selectedImages: {
    type: Array,
    default: () => [],
  },
  additionalActions: {
    type: Array,
    default: () => [],
  },
  discardable: {
    type: Boolean,
    default: true,
  },
});

const setSelectable = inject("setImagesSelectable");

const setUnselectable = inject("setImagesUnselectable");

const isFetching = ref(false);

const deleteHandler = async () => {
  try {
    isFetching.value = true;
    await apiClient.delete(
      "/images",
      props.selectedImages.map((image) => image.id)
    );
    store.dispatch(FETCH_IMAGES);
    setUnselectable();
  } finally {
    isFetching.value = false;
  }
};

provide("seImagesToolbarFetching", (value) => {
  isFetching.value = value;
});
</script>
