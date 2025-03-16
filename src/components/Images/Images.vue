<script setup lang="ts">
import { ref, provide, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useImagesStore } from "@/stores/images.store";
import { NImageGroup, NPagination, NSkeleton, NEmpty } from "naive-ui";
import type { Image as BycarImage } from "@bycar-in-ua/sdk";
import Image from "./Image.vue";
import ImagesToolBar from "./ImagesToolBar.vue";
import {
  setImagesSelectableKey,
  addImageToSelectionKey,
  setImagesUnselectableKey,
  removeImageFromSelectionKey,
  cdnPathToSaveKey,
  clearSelectionKey,
} from "./keys";
import { ToolbarAction } from "./types";

interface IProps {
  isUploadble?: boolean;
  isSelectable?: boolean;
  discardable?: boolean;
  singleSelection?: boolean;
  preselectedImages?: BycarImage[];
  toolbarActions?: ToolbarAction[];
  cdnPathToSave?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  isUploadble: true,
  isSelectable: false,
  discardable: false,
  singleSelection: false,
  preselectedImages: () => [],
  cdnPathToSave: "",
});

defineEmits(["paginate"]);

const imagesStore = useImagesStore();
const { t } = useI18n();

const selectable = ref(props.isSelectable);

const selectedImages = ref<BycarImage[]>([...props.preselectedImages]);

const selectedImagesIds = computed(() =>
  selectedImages.value.map((image) => image.id)
);

provide(setImagesSelectableKey, () => {
  selectable.value = true;
});

provide(setImagesUnselectableKey, () => {
  selectable.value = false;
  selectedImages.value = [];
});

provide(addImageToSelectionKey, (image) => {
  if (props.singleSelection) {
    selectedImages.value = [image];
    return;
  }
  selectedImages.value.push(image);
});

provide(removeImageFromSelectionKey, (imageId) => {
  selectedImages.value = selectedImages.value.filter(
    (item) => item !== imageId
  );
});

provide(clearSelectionKey, () => {
  selectedImages.value = [];
});

provide(cdnPathToSaveKey, props.cdnPathToSave);
</script>

<template>
  <ImagesToolBar
    :uploadble="isUploadble"
    :selectable="selectable"
    :selected-images="selectedImages"
    :additional-actions="toolbarActions"
    :discardable="discardable"
  />
  <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
    <n-image-group>
      <n-skeleton
        v-if="imagesStore.isFetching"
        :repeat="28"
        width="100%"
        height="14vh"
      />
      <template v-else>
        <Image
          v-for="image in imagesStore.images"
          :key="image.id"
          :image="image"
          :selectable="selectable"
          :selected="selectedImagesIds.includes(image.id)"
        />
      </template>
    </n-image-group>
  </div>
  <n-empty
    v-if="!imagesStore.images.length"
    :description="t('images.empty')"
    class="p-4"
  />
  <n-pagination
    v-if="imagesStore.meta.totalPages > 1"
    class="mt-4 justify-end"
    :page="imagesStore.meta.currentPage"
    :page-count="imagesStore.meta.totalPages"
    :disabled="imagesStore.isFetching"
    @update:page="(page) => imagesStore.fetchImages(page)"
  />
</template>
