<template>
  <n-card>
    <template #header>
      <option-editor
        v-if="isEdit"
        :value="optionCategory.displayName"
        :positive-click="hadnleSave"
        :negative-click="hadleClose"
        :loading="isFetching"
      />
      <div v-else class="flex items-center">
        {{ optionCategory.displayName }}
        <n-icon
          class="title-icon cursor-pointer transition-all ml-auto"
          @click="isEdit = true"
          :title="t('edit')"
        >
          <PencilSharp />
        </n-icon>
        <n-icon
          class="title-icon transition-all cursor-pointer ml-2"
          @click="handleDelete"
          :title="t('delete')"
        >
          <CloseSharp />
        </n-icon>
      </div>
    </template>
    <n-scrollbar class="max-h-48 pr-3">
      <n-list>
        <OptionCategoryListItem
          v-for="option in options"
          :key="option.id"
          :option="option"
          :category="optionCategory"
        />
      </n-list>
    </n-scrollbar>
    <template #action>
      <add-new-option
        :category-id="optionCategory.id"
        :show-feedback="false"
        form-item-class=" flex-grow"
      />
    </template>
  </n-card>
</template>

<script>
export default {
  name: "OptionCategory",
};
</script>

<script setup>
import { defineProps, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { NList, NCard, NIcon, NScrollbar } from "naive-ui";
import { PencilSharp, CloseSharp } from "@vicons/ionicons5";
import OptionCategoryListItem from "./OptionCategoryListItem";
import OptionEditor from "./OptionEditor";
import AddNewOption from "@/components/common/AddNewOption";
import apiClient from "@/helpers/apiClient";
import { UPDATE_LIBRARY_ITEM } from "@/store/modules/library/mutationTypes";

const props = defineProps({
  optionCategory: Object,
  options: Array,
  openDeleteDrawer: Function,
});

const store = useStore();
const { t } = useI18n();

const isEdit = ref(false);
const isFetching = ref(false);

const hadnleSave = async (val) => {
  isFetching.value = true;
  const updatedOptCat = await apiClient.put(
    `/option-categories/${props.optionCategory.id}`,
    {
      displayName: val,
    }
  );
  store.commit(UPDATE_LIBRARY_ITEM, ["optionCategories", updatedOptCat]);
  isEdit.value = false;
  isFetching.value = false;
};

const hadleClose = () => (isEdit.value = false);

const handleDelete = async () => {
  props.openDeleteDrawer(props.optionCategory.id);
};
</script>

<style lang="scss">
.title-icon {
  opacity: 0.2;
  &:hover {
    opacity: 1;
  }
}
</style>
