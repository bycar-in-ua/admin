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
      <div v-else class="flex justify-between items-center title-wraper">
        {{ optionCategory.displayName }}
        <n-icon
          class="title-icon cursor-pointer transition-all"
          @click="isEdit = true"
        >
          <PencilSharp />
        </n-icon>
      </div>
    </template>
    <n-list>
      <OptionCategoryListItem
        v-for="option in options"
        :key="option.id"
        :option="option"
      />
    </n-list>
  </n-card>
</template>

<script>
export default {
  name: "OptionCategoryList",
};
</script>

<script setup>
import { defineProps, ref } from "vue";
import { useStore } from "vuex";
import { NList, NCard, NIcon } from "naive-ui";
import { PencilSharp } from "@vicons/ionicons5";
import OptionCategoryListItem from "./OptionCategoryListItem";
import OptionEditor from "./OptionEditor";
import apiClient from "@/helpers/apiClient";
import { UPDATE_LIBRARY_ITEM } from "@/store/modules/library/mutationTypes";

const props = defineProps({
  optionCategory: Object,
  options: Array,
});

const store = useStore();

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
</script>

<style lang="scss">
.title-wraper {
  &:hover {
    .title-icon {
      opacity: 1;
    }
  }
}
.title-icon {
  opacity: 0.2;
}
</style>
