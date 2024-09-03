<script setup lang="ts">
import { inject } from "vue";
import type { ImageDto as Image } from "@bycar-in-ua/common";
import { cdnLink } from "@/helpers/cdn";
import { NImage } from "naive-ui";

const props = defineProps<{
  image: Image;
  selectable?: boolean;
  selected?: boolean;
}>();

const selectImage = inject("addImageToSelection");
const unselectImage = inject("removeImageFromSelection");

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
    <n-image
      :src="cdnLink(image.path, 300, 300)"
      class="w-full object-cover aspect-square"
      object-fit="cover"
      width="100%"
      lazy
    />
  </div>
  <n-image
    v-else
    :src="cdnLink(image.path, 300, 300)"
    :preview-src="cdnLink(image.path)"
    class="rounded-lg"
    object-fit="cover"
    lazy
  />
</template>
