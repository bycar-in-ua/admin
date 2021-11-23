<template>
  <ImagesToolBar
    :selectable="selectable"
    :selected-images="selectedImages"
    :additional-actions="toolbarActions"
  />
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-4"
  >
    <n-image-group>
      <n-skeleton
        v-if="images.isFetching"
        :repeat="10"
        width="100%"
        height="15vh"
      />
      <template v-else>
        <Image
          v-for="image in images.items"
          :key="image.id"
          :image="image"
          :selectable="selectable"
          :selected="selectedImages.includes(image.id)"
        />
      </template>
    </n-image-group>
  </div>
  <n-empty
    v-if="!images.items?.length"
    :description="t('images.empty')"
    class="p-4"
  />
  <n-pagination
    v-if="images.totalPages > 1"
    class="mt-4 justify-end"
    :page="images.curentPage"
    :page-count="images.totalPages"
    :disabled="images.isFetching"
    @update:page="handlePagination"
  />
</template>

<script>
export default {
  name: "Images",
};
</script>

<script setup>
import { computed, ref, provide, defineProps } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import ImagesToolBar from "./ImagesToolBar";
import Image from "./Image";
import { NImageGroup, NPagination, NSkeleton, NEmpty } from "naive-ui";
import { FETCH_IMAGES } from "@/store/modules/library/images/actionTypes";

const props = defineProps({
  isSelectable: {
    type: Boolean,
    default: false,
    requierd: false,
  },
  preselectedImages: {
    type: Array,
    default: () => [],
  },
  toolbarActions: Array,
});

const store = useStore();
const { t } = useI18n();

store.dispatch(FETCH_IMAGES);

const selectable = ref(props.isSelectable);

const selectedImages = ref(props.preselectedImages);

const handlePagination = (page) => {
  store.dispatch(FETCH_IMAGES, page);
};

provide("setImagesSelectable", () => {
  selectable.value = true;
});

provide("setImagesUnselectable", () => {
  selectable.value = false;
  selectedImages.value = [];
});

provide("addImageToSelection", (imageId) => {
  selectedImages.value.push(imageId);
});

provide("removeImageFromSelection", (imageId) => {
  selectedImages.value = selectedImages.value.filter(
    (item) => item !== imageId
  );
});

const images = computed(() => store.state.library.images);
</script>