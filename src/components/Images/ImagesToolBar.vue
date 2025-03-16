<script setup lang="ts">
import { inject, ref, provide } from "vue";
import { useI18n } from "vue-i18n";
import type { Image } from "@bycar-in-ua/sdk";
import AddNewImage from "./AddNewImage.vue";
import { NButton } from "naive-ui";
import apiClient from "@/helpers/apiClient";
import type { ToolbarAction } from "@/components/Images";
import { useImagesStore } from "@/stores/images.store";
import {
  setImagesSelectableKey,
  setImagesUnselectableKey,
  clearSelectionKey,
} from "./keys";

defineOptions({
  name: "ImagesToolBar",
});

interface IProps {
  uploadble: boolean;
  selectable: boolean;
  selectedImages?: Image[];
  additionalActions?: ToolbarAction[];
  discardable?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  selectedImages: () => [],
  additionalActions: () => [],
  discardable: true,
});

const imagesStore = useImagesStore();
const { t } = useI18n();

const setSelectable = inject(setImagesSelectableKey);
const setUnselectable = inject(setImagesUnselectableKey);
const clearSelection = inject(clearSelectionKey);

const isFetching = ref(false);

const deleteHandler = async () => {
  try {
    isFetching.value = true;

    await apiClient.delete("/images", props.selectedImages);

    imagesStore.fetchImages(imagesStore.meta.currentPage);
    setUnselectable();
  } finally {
    isFetching.value = false;
  }
};

provide("seImagesToolbarFetching", (value) => {
  isFetching.value = value;
});
</script>

<template>
  <div class="flex my-4">
    <n-button
      v-if="selectable && discardable"
      type="primary"
      class="mr-4"
      :disabled="isFetching"
      @click="setUnselectable"
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
      :is="action.component"
      v-for="(action, index) in additionalActions"
      :key="index"
      @click="action.clickCallback(selectedImages)"
    />

    <template v-if="selectedImages.length">
      <n-button
        v-if="selectedImages.length > 0"
        class="mr-4"
        @click="clearSelection"
      >
        {{ t("clear") }}
      </n-button>
      <n-button
        type="error"
        class="mr-4"
        :disabled="isFetching"
        :loading="isFetching"
        ghost
        @click="deleteHandler"
      >
        {{ t("delete") }}
      </n-button>
    </template>

    <AddNewImage v-if="uploadble" class="ml-auto" />
  </div>
</template>
