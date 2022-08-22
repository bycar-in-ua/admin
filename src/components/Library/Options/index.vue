<template>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <OptionCategory
      v-for="optionCategory in Object.values(optionsStore.categories)"
      :key="optionCategory.id"
      :option-category="optionCategory"
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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Options",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NDrawer, NDrawerContent, NButton, NDivider, NIcon } from "naive-ui";
import { AddCircleOutline } from "@vicons/ionicons5";
import colors from "@/colors.json";
import OptionCategory from "./OptionCategory/index.vue";
import AddNewOptionCategory from "@/components/common/AddNewOptionCategory.vue";
import { useOptionsStore } from "@/stores/options.store";

const optionsStore = useOptionsStore();
const { t } = useI18n();

optionsStore.fetchOptionsByCategories();

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
    await optionsStore.deleteOptionCategory(targetCategory.value);
    targetCategory.value = null;
    showDrawer.value = false;
  } finally {
    isFetching.value = false;
  }
};
</script>
