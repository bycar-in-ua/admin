<template>
  <n-modal
    v-model:show="postCategoryModalStore.isModalOpen"
    preset="card"
    class="max-w-lg"
    :title="title"
    @after-leave="postCategoryModalStore.$reset()"
  >
    <n-form
      ref="formRef"
      :model="postCategoryModalStore.category"
      :disabled="postCategoryModalStore.loading"
      :rules="rules"
    >
      <n-form-item :label="t('title')" path="title" required>
        <n-input
          id="postCatTitle"
          v-model:value="postCategoryModalStore.category.title"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.slug')" path="slug" required>
        <n-input v-model:value="postCategoryModalStore.category.slug" />
      </n-form-item>
      <n-form-item :label="t('posts.parentCategory')">
        <n-tree-select
          v-model:value="postCategoryModalStore.category.parent"
          key-field="id"
          label-field="title"
          :options="postCategoriesStore.getCategoriesTree"
          clearable
          default-expand-all
        />
      </n-form-item>
    </n-form>

    <template #footer>
      <div class="flex gap-4 justify-end flex-wrap">
        <n-button
          v-if="postCategoryModalStore.isEdit"
          type="error"
          :loading="postCategoryModalStore.loading"
          style="marging-right: auto"
          @click="deleteHandler"
        >
          {{ t("delete") }}
        </n-button>
        <span class="flex-grow" />
        <n-button
          type="primary"
          :loading="postCategoryModalStore.loading"
          @click="submitHandler"
        >
          {{ t("save") }}
        </n-button>
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
import { computed, ref } from "vue";
import {
  NModal,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NTreeSelect,
} from "naive-ui";
import type { FormRules } from "naive-ui";
import {
  usePostCategoryModalStore,
  usePostCategoriesStore,
} from "@/stores/postCategories.store";
import { useI18n } from "vue-i18n";

const postCategoryModalStore = usePostCategoryModalStore();
const postCategoriesStore = usePostCategoriesStore();

const { t } = useI18n();
const formRef = ref(null);

const rules: FormRules = {
  title: {
    required: true,
  },
  slug: {
    required: true,
  },
};

const title = computed(() =>
  postCategoryModalStore.isEdit
    ? `${t("edit")}: ${postCategoryModalStore.category.title}`
    : t("posts.addCategory")
);

async function submitHandler() {
  await formRef.value.validate();
  await postCategoryModalStore.storePostCategory();
  postCategoriesStore.fetchPostCategories();
  postCategoryModalStore.isModalOpen = false;
}

async function deleteHandler() {
  await postCategoryModalStore.deletePostCategory();
  postCategoriesStore.fetchPostCategories();
  postCategoryModalStore.isModalOpen = false;
}
</script>
