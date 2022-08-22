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
          :selected="selectedImages.includes(image.id)"
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

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Images",
});
</script>

<script setup lang="ts">
import { ref, provide, type Component } from "vue";
import { useI18n } from "vue-i18n";
import ImagesToolBar from "./ImagesToolBar.vue";
import Image from "./Image.vue";
import { NImageGroup, NPagination, NSkeleton, NEmpty } from "naive-ui";
import { useImagesStore } from "@/stores/images.store";

export interface ToolbarAction {
  component: Component;
  clickCallback: (...args) => void | Promise<void>;
}

interface IProps {
  isUploadble?: boolean;
  isSelectable?: boolean;
  discardable?: boolean;
  singleSelection?: boolean;
  preselectedImages?: Array<number | string>;
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

const selectedImages = ref([...props.preselectedImages]);

provide("setImagesSelectable", () => {
  selectable.value = true;
});

provide("setImagesUnselectable", () => {
  selectable.value = false;
  selectedImages.value = [];
});

provide("addImageToSelection", (imageId) => {
  if (props.singleSelection) {
    selectedImages.value = [imageId];
    return;
  }
  selectedImages.value.push(imageId);
});

provide("removeImageFromSelection", (imageId) => {
  selectedImages.value = selectedImages.value.filter(
    (item) => item !== imageId
  );
});

provide("cdnPathToSave", props.cdnPathToSave);

provide("isUploadble", props.isUploadble);
</script>
