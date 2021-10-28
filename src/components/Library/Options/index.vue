<template>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <OptionCategory
      v-for="optionCategory in optionCategories"
      :key="optionCategory.id"
      :option-category="optionCategory"
      :options="optionsByCategories[optionCategory.id]"
      :open-delete-drawer="openDrawer"
    />
  </div>
  <n-divider>
    <add-new-option-category>
      <n-icon
        size="40"
        :color="colors.primary.lighten1"
        :title="t('options.addCategory')"
        class="cursor-pointer"
      >
        <add-circle-outline />
      </n-icon>
    </add-new-option-category>
  </n-divider>
  <n-drawer v-model:show="showDrawer" placement="right">
    <n-drawer-content :title="t('info.confirmation')" closable>
      {{ t("info.deletingOptionCategory") }}
      <div class="text-right mt-4">
        <n-button
          type="error"
          size="medium"
          :loading="isFetching"
          :disabled="isFetching"
          @click="hadleDelete"
        >
          {{ t("delete") }}
        </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
export default {
  name: "Options",
};
</script>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NDrawer, NDrawerContent, NButton, NDivider, NIcon } from "naive-ui";
import { AddCircleOutline } from "@vicons/ionicons5";
import colors from "@/colors";
import {
  FETCH_OPTIONS,
  FETCH_OPTION_CATEGORIES,
} from "@/store/modules/library/actionTypes";
import OptionCategory from "./OptionCategory";
import AddNewOptionCategory from "@/components/common/AddNewOptionCategory";
import apiClient from "@/helpers/apiClient";

const store = useStore();
const { t } = useI18n();

store.dispatch(FETCH_OPTION_CATEGORIES);
store.dispatch(FETCH_OPTIONS);

const showDrawer = ref(false);
const isFetching = ref(false);
const targetCategory = ref(null);

const openDrawer = (targetCategoryId) => {
  showDrawer.value = true;
  targetCategory.value = targetCategoryId;
};

const hadleDelete = async () => {
  try {
    isFetching.value = true;
    await apiClient.delete(`/option-categories/${targetCategory.value}`);
    store.dispatch(FETCH_OPTION_CATEGORIES);
    store.dispatch(FETCH_OPTIONS);
    targetCategory.value = null;
    showDrawer.value = false;
  } finally {
    isFetching.value = false;
  }
};

const optionCategories = computed(() => store.state.library.optionCategories);
const optionsByCategories = computed(
  () => store.getters.getOptionsByCategories
);
</script>
