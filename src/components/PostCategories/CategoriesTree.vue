<template>
  <n-tree
    key-field="id"
    label-field="title"
    :data="postCategoriesStore.getCategoriesTree"
    :render-prefix="renderPrefix"
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
import { h } from "vue";
import {
  usePostCategoriesStore,
  usePostCategoryModalStore,
} from "@/stores/postCategories.store";
import { NTree, NIcon } from "naive-ui";
import type { TreeDropInfo } from "naive-ui";
import { Pencil } from "@vicons/ionicons5";

const postCategoriesStore = usePostCategoriesStore();
const postCategoryModalStore = usePostCategoryModalStore();

const handleDrop = async (dropInfo: TreeDropInfo) => {
  switch (dropInfo.dropPosition) {
    case "inside":
      await postCategoriesStore.updateParrent(
        dropInfo.dragNode.key,
        dropInfo.node.key
      );
      break;

    default:
      console.log(dropInfo);
      break;
  }
};

const renderPrefix = ({ option }) => {
  return h(
    NIcon,
    {
      onClick: () => {
        postCategoryModalStore.category = option;
        postCategoryModalStore.isModalOpen = true;
      },
    },
    h(Pencil)
  );
};
</script>
