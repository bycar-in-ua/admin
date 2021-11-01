<template>
  <add-new-image />
  <Images />
</template>

<script>
export default {
  components: { AddNewImage },
  name: "ImagesView",
};
</script>

<script setup>
import Images from "@/components/Images";
import AddNewImage from "@/components/Images/AddNewImage";
</script>
