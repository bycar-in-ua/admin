<template>
  <Images />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ImagesView",
});
</script>

<script setup lang="ts">
import Images from "@/components/Images/Images.vue";
import { useImagesStore } from "@/stores/images.store";

const imagesStore = useImagesStore();

imagesStore.fetchImages(1);
</script>
