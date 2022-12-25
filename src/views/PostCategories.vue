<template>
  <n-button
    type="primary"
    class="mb-4"
    @click="postCategoryStore.isModalOpen = true"
  >
    <template #icon>
      <n-icon>
        <Add />
      </n-icon>
    </template>
    {{ t("add") }}
  </n-button>
  <CategoriesTree />
  <PostCategoryModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PostCategoriesView",
});
</script>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import CategoriesTree from "@/components/PostCategories/CategoriesTree.vue";
import PostCategoryModal from "@/components/PostCategories/PostCategoryModal.vue";
import {
  usePostCategoriesStore,
  usePostCategoryModalStore,
} from "@/stores/postCategories.store";
import { NButton, NIcon } from "naive-ui";
import { Add } from "@vicons/ionicons5";

const postCategoriesStore = usePostCategoriesStore();
const postCategoryStore = usePostCategoryModalStore();

postCategoriesStore.fetchPostCategories();

const { t } = useI18n();
</script>
