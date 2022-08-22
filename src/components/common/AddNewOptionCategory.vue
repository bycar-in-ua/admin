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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddNewOptionsCategory",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import { NPopconfirm, NInput, useNotification } from "naive-ui";
import { useI18n } from "vue-i18n";
import { useOptionsStore } from "@/stores/options.store";

const optionsStore = useOptionsStore();
const { t } = useI18n();
const notification = useNotification();

const isFetching = ref(false);

const newOptCatName = ref("");

const createOptionCategory = async () => {
  try {
    isFetching.value = true;
    await optionsStore.createOptionCategory(newOptCatName.value);
    newOptCatName.value = "";
    notification.success({
      title: t("notifications.success.title.default"),
      duration: 3000,
    });
  } catch (error: Error) {
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
