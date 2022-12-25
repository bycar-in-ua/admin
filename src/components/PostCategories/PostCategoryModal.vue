<template>
  <n-modal
    v-model:show="postCategoryModalStore.isModalOpen"
    preset="card"
    class="max-w-lg"
    :title="title"
  >
    <template #footer>
      <div class="flex justify-between">
        <n-button type="error">{{ t("discard") }}</n-button>
        <n-button type="primary">{{ t("save") }}</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PostCategoryModal",
});
</script>

<script setup lang="ts">
import { computed } from "vue";
import { NModal, NButton } from "naive-ui";
import { usePostCategoryModalStore } from "@/stores/postCategories.store";
import { useI18n } from "vue-i18n";

const postCategoryModalStore = usePostCategoryModalStore();

const { t } = useI18n();

const title = computed(() =>
  postCategoryModalStore.isEdit
    ? `${t("edit")}: ${postCategoryModalStore.category.title}`
    : t("posts.addCategory")
);
</script>
