<template>
  <n-tree
    :data="postCategoriesStore.getCategoriesTree"
    draggable
    @drop="handleDrop"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CategoriesTree",
});
</script>

<script setup lang="ts">
import { usePostCategoriesStore } from "@/stores/postCategories.store";
import { NTree } from "naive-ui";
import type { TreeDropInfo } from "naive-ui";

const postCategoriesStore = usePostCategoriesStore();

const handleDrop = async (dropInfo: TreeDropInfo) => {
  switch (dropInfo.dropPosition) {
    case "inside":
      await postCategoriesStore.updateParrent(
        dropInfo.dragNode.key,
        dropInfo.node.key
      );
      break;

    default:
      break;
  }
};
</script>
