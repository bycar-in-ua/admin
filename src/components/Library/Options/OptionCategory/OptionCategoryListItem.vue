<template>
  <n-list-item>
    <OptionEditor
      v-if="isEdit"
      :value="option.label"
      :positive-click="hadnleSave"
      :swap-click="handleSwap"
      :negative-click="hadleClose"
      :loading="isFetching"
    />
    <div v-else class="flex justify-between items-center">
      {{ option.label }}
      <n-icon
        class="cursor-pointer ml-auto"
        @click="isEdit = true"
        :title="t('edit')"
      >
        <Pencil />
      </n-icon>
      <n-popselect
        :value="category.id"
        :options="categoryOptions"
        size="small"
        scrollable
        :on-update:value="handleSwap"
      >
        <n-icon
          class="cursor-pointer ml-2"
          @click="() => {}"
          :title="t('options.changeCategory')"
        >
          <SwapVertical />
        </n-icon>
      </n-popselect>
      <n-icon
        class="cursor-pointer ml-2"
        @click="handleDelete"
        :title="t('delete')"
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
import { defineProps, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { NListItem, NIcon, NPopselect, useNotification } from "naive-ui";
import { Pencil, Close, SwapVertical } from "@vicons/ionicons5";
import OptionEditor from "./OptionEditor";
import apiClient from "@/helpers/apiClient";
import { UPDATE_LIBRARY_ITEM } from "@/store/modules/library/mutationTypes";
import {
  CHANGE_OPTION_CATEGORY,
  DELETE_OPTION,
} from "@/store/modules/library/actionTypes";

const props = defineProps({
  option: Object,
  category: Object,
});

const store = useStore();
const { t } = useI18n();
const notification = useNotification();

const isEdit = ref(false);
const isFetching = ref(false);

const categoryOptions = computed(
  () => store.state.library.optionCategories
).value.map((cat) => ({
  value: cat.id,
  label: cat.displayName,
}));

const hadnleSave = async (val) => {
  isFetching.value = true;
  const updatedOption = await apiClient.put(`/options/${props.option.value}`, {
    displayName: val,
  });
  store.commit(UPDATE_LIBRARY_ITEM, ["options", updatedOption]);
  isEdit.value = false;
  isFetching.value = false;
};

const handleDelete = async () => {
  isFetching.value = true;
  await store.dispatch(DELETE_OPTION, props.option.value);
  isFetching.value = false;
};

const handleSwap = (targetCategory) => {
  if (targetCategory === props.category.id) {
    return;
  }
  try {
    store.dispatch(CHANGE_OPTION_CATEGORY, [props.option, targetCategory]);
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
