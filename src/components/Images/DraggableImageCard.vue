<script setup lang="ts">
import { NIcon, NImage } from "naive-ui";
import { CloseCircleOutline } from "@vicons/ionicons5";
import { cdnLink } from "@/helpers/cdn";
import type { Image } from "@bycar-in-ua/sdk";

defineProps<{ image: Image; index: number }>();

defineEmits<{
  delete: [Image];
}>();

function onStartDrag(evt, imageId: number) {
  evt.dataTransfer.setData("imageId", imageId);
}
</script>

<template>
  <div
    class="draggable-image-card relative"
    draggable
    @dragstart="onStartDrag($event, image.id)"
  >
    <NIcon
      class="delete-icon absolute -left-4 -top-4 text-3xl transition-all opacity-0 cursor-pointer hover:text-red-600"
      @click="$emit('delete', image)"
    >
      <CloseCircleOutline />
    </NIcon>

    <NImage
      :src="cdnLink(image.path, 'thumbnail')"
      :preview-src="cdnLink(image.path)"
      :data-index="index"
    />
  </div>
</template>

<style>
.draggable-image-card:hover .delete-icon {
  @apply opacity-100;
}
</style>
