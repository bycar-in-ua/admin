<template>
  <Posts />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PostsView",
});
</script>

<script setup lang="ts">
import Posts from "@/components/Posts/index.vue";
</script>
