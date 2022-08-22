<template>
  <n-list-item>
    <OptionEditor
      v-if="isEdit"
      :value="option.displayName"
      :positive-click="hadnleSave"
      :swap-click="handleSwap"
      :negative-click="hadleClose"
      :loading="isFetching"
    />
    <div v-else class="flex justify-between items-center">
      {{ option.displayName }}
      <n-icon
        class="cursor-pointer ml-auto"
        :title="t('edit')"
        @click="isEdit = true"
      >
        <Pencil />
      </n-icon>
      <n-popselect
        :value="category.id"
        :options="optionsStore.optionCategoriesForSelect"
        size="small"
        scrollable
        :on-update:value="handleSwap"
      >
        <n-icon
          class="cursor-pointer ml-2"
          :title="t('options.changeCategory')"
          @click="() => {}"
        >
          <SwapVertical />
        </n-icon>
      </n-popselect>
      <n-icon
        class="cursor-pointer ml-2"
        :title="t('delete')"
        @click="handleDelete"
      >
        <Close />
      </n-icon>
    </div>
  </n-list-item>
</template>

<script>
export default {
  name: "OptionCategoryListItem",
};
</script>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NListItem, NIcon, NPopselect, useNotification } from "naive-ui";
import { Pencil, Close, SwapVertical } from "@vicons/ionicons5";
import OptionEditor from "./OptionEditor";
import apiClient from "@/helpers/apiClient";
import { useOptionsStore } from "@/stores/options.store";

const props = defineProps({
  option: Object,
  category: Object,
});

const optionsStore = useOptionsStore();
const { t } = useI18n();
const notification = useNotification();

const isEdit = ref(false);
const isFetching = ref(false);

const hadnleSave = async (val) => {
  isFetching.value = true;
  const updatedOption = await apiClient.put(`/options/${props.option.id}`, {
    displayName: val,
  });

  optionsStore.categories[props.category.id].options[
    optionsStore.categories[props.category.id].options.findIndex(
      (op) => op.id === updatedOption.id
    )
  ] = updatedOption;

  isEdit.value = false;
  isFetching.value = false;
};

const handleDelete = async () => {
  isFetching.value = true;
  await optionsStore.deleteOption(props.option.id);
  isFetching.value = false;
};

const handleSwap = (targetCategory) => {
  if (targetCategory === props.category.id) {
    return;
  }
  try {
    optionsStore.changeOptionCategory(props.option, targetCategory);
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
  }
};

const hadleClose = () => (isEdit.value = false);
</script>
