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
import { NPopconfirm, NInput } from "naive-ui";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { CREATE_OPTION_CATEGORY } from "@/store/modules/library/actionTypes";

const store = useStore();
const { t } = useI18n();

const isFetching = ref(false);

const newOptCatName = ref("");

const createOptionCategory = async () => {
  isFetching.value = true;
  await store.dispatch(CREATE_OPTION_CATEGORY, newOptCatName.value);
  newOptCatName.value = "";
  isFetching.value = false;
};
</script>
