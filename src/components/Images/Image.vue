<template>
  <div
    v-if="selectable"
    class="overflow-hidden outline-4 outline outline-offset-[-4px] rounded-lg cursor-pointer flex justify-center"
    :class="selected ? 'outline-primary' : 'outline-gray-400'"
    @click="clickHandler"
  >
    <img
      :src="cdnLink(image.path, 300, 300)"
      class="w-full object-cover aspect-square"
    />
  </div>
  <n-image
    v-else
    :src="cdnLink(image.path, 300, 300)"
    :preview-src="cdnLink(image.path)"
    class="rounded-lg"
    object-fit="cover"
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
