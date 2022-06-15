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
      <div
        v-else
        class="flex items-center"
      >
        {{ optionCategory.displayName }}
        <n-icon
          class="title-icon cursor-pointer transition-all ml-auto"
          :title="t('edit')"
          @click="isEdit = true"
        >
          <PencilSharp />
        </n-icon>
        <n-icon
          class="title-icon transition-all cursor-pointer ml-2"
          :title="t('delete')"
          @click="handleDelete"
        >
          <CloseSharp />
        </n-icon>
      </div>
    </template>
    <n-scrollbar class="max-h-48 pr-3">
      <n-list>
        <OptionCategoryListItem
          v-for="option in optionCategory.options"
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
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { NList, NCard, NIcon, NScrollbar } from "naive-ui";
import { PencilSharp, CloseSharp } from "@vicons/ionicons5";
import OptionCategoryListItem from "./OptionCategoryListItem";
import OptionEditor from "./OptionEditor";
import AddNewOption from "@/components/common/AddNewOption";
import apiClient from "@/helpers/apiClient";
import { UPDATE_OPTION_CATEGORY } from "@/store/modules/library/options/mutationTypes";

const props = defineProps({
  optionCategory: Object,
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
  store.commit(UPDATE_OPTION_CATEGORY, [
    props.optionCategory.id,
    updatedOptCat,
  ]);
  isEdit.value = false;
  isFetching.value = false;
};

const hadleClose = () => (isEdit.value = false);

const handleDelete = async () => {
  props.openDeleteDrawer(props.optionCategory.id);
};
</script>

<style lang="postcss">
.title-icon {
  opacity: 0.2;
  &:hover {
    opacity: 1;
  }
}
</style>
