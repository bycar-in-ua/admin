<template>
  <div
    v-if="selectable"
    class="border-4 rounded-lg cursor-pointer"
    :class="selected ? 'border-primary' : 'border-gray-400'"
    @click="clickHandler"
  >
    <img
      :src="cdnLink(image.path, 300, 300)"
      class="opacity-80"
    >
  </div>
  <n-image
    v-else
    :src="cdnLink(image.path, 300, 300)"
    :preview-src="cdnLink(image.path)"
  />
</template>

<script>
export default {
  name: "Image",
};
</script>

<script setup>
import { inject } from "vue";
import { cdnLink } from "@/helpers/cdn";
import { NImage } from "naive-ui";

const props = defineProps({
  image: {
    type: Object,
    requierd: true,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

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
