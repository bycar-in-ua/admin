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
        type="error"
        class="mr-4"
        :disabled="isFetching"
        :loading="isFetching"
        @click="deleteHandler"
      >
        {{ t("delete") }}
      </n-button>
    </template>

    <AddNewImage v-if="uploadble" class="ml-auto" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImagesToolBar",
});
</script>

<script setup lang="ts">
import { inject, ref, provide } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import AddNewImage from "./AddNewImage.vue";
import { NButton } from "naive-ui";
import apiClient from "@/helpers/apiClient";
import { FETCH_IMAGES } from "@/store/modules/library/images/actionTypes";
import { type ToolbarAction } from "@/components/Images/index.vue";

interface IProps {
  uploadble: boolean;
  selectable: boolean;
  selectedImages?: Array<number | string>;
  additionalActions?: ToolbarAction[];
  discardable?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  selectedImages: () => [],
  additionalActions: () => [],
  discardable: true,
});

const store = useStore();
const { t } = useI18n();

const setSelectable = inject<() => void>("setImagesSelectable");

const setUnselectable = inject<() => void>("setImagesUnselectable");

const isFetching = ref(false);

const deleteHandler = async () => {
  try {
    isFetching.value = true;

    const imagesToDelete = store.state.library.images.items
      .filter((image) => props.selectedImages.includes(image.id))
      .map((image) => image.path);

    await apiClient.delete("/images", props.selectedImages);
    await apiClient.deleteFiles(imagesToDelete);

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
