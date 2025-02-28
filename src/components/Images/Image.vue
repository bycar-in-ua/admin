<script setup lang="ts">
import { inject } from "vue";
import type { Image } from "@bycar-in-ua/sdk";
import { cdnLink } from "@/helpers/cdn";
import { NImage } from "naive-ui";
import { addImageToSelectionKey, removeImageFromSelectionKey } from "./keys";

const props = defineProps<{
  image: Image;
  selectable?: boolean;
  selected?: boolean;
}>();

const selectImage = inject(addImageToSelectionKey);
const unselectImage = inject(removeImageFromSelectionKey);

const clickHandler = () => {
  if (props.selected) {
    unselectImage(props.image.id);
    return;
  }
  selectImage(props.image.id);
};
</script>

<template>
  <div
    v-if="selectable"
    class="overflow-hidden outline-4 outline outline-offset-[-4px] rounded-lg cursor-pointer flex justify-center"
    :class="selected ? 'outline-primary' : 'outline-gray-400'"
    @click="clickHandler"
  >
    <img
      :src="cdnLink(image.path, 'thumbnail')"
      class="w-full object-cover aspect-square"
      object-fit="cover"
      width="100%"
      lazy
    />
  </div>
  <n-image
    v-else
    :src="cdnLink(image.path, 'thumbnail')"
    :preview-src="cdnLink(image.path)"
    class="rounded-lg"
    object-fit="cover"
    lazy
  />
</template>
