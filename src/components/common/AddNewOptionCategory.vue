<template>
  <n-popconfirm
    :show-icon="false"
    :positive-text="t('options.addCategory')"
    :negative-text="t('discard')"
    @positive-click="createOptionCategory"
  >
    <template #trigger>
      <slot />
    </template>
    <n-input
      v-model:value="newOptCatName"
      type="text"
      :placeholder="t('options.enterCategoryName')"
      :loading="isFetching"
      :disabled="isFetching"
    />
  </n-popconfirm>
</template>

<script>
export default {
  name: "AddNewOptionsCategory",
};
</script>

<script setup>
import { ref } from "vue";
import { NPopconfirm, NInput, useNotification } from "naive-ui";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { CREATE_OPTION_CATEGORY } from "@/store/modules/library/options/actionTypes";

const store = useStore();
const { t } = useI18n();
const notification = useNotification();

const isFetching = ref(false);

const newOptCatName = ref("");

const createOptionCategory = async () => {
  try {
    isFetching.value = true;
    await store.dispatch(CREATE_OPTION_CATEGORY, newOptCatName.value);
    newOptCatName.value = "";
    notification.success({
      title: t("notifications.success.title.default"),
      duration: 3000,
    });
  } catch (error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
      duration: 5000,
    });
  } finally {
    isFetching.value = false;
  }
};
</script>
