<template>
  <n-tree :data="categories" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CategoriesTree",
});
</script>

<script setup lang="ts">
import { computed } from "vue";
import { usePostCategoriesStore } from "@/stores/postCategories.store";
import { NTree } from "naive-ui";
import type { TreeOption } from "naive-ui";

const postCategoriesStore = usePostCategoriesStore();

const categories = computed<TreeOption[]>(() =>
  postCategoriesStore.categories.map((postCat) => ({
    key: postCat.id,
    label: postCat.title,
  }))
);
</script>
