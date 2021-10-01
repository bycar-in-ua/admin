<template>
  <n-collapse>
    <n-collapse-item
      v-for="category in optionCategories"
      :key="category.id"
      :title="category.displayName"
      :name="category.id"
    >
      <div class="">
        <n-transfer
          virtual-scroll
          filterable
          :options="optionsByCategories[category.id]"
          :value="getOptionsByCategory(complectation.options, category.id)"
          :on-update:value="updateHandler"
        />
        <add-new-option />
      </div>
    </n-collapse-item>
  </n-collapse>
</template>

<script>
export default {
  name: "OptionsEditor",
};
</script>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "vuex";
import { NTransfer, NCollapse, NCollapseItem } from "naive-ui";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { SET_COMPLECTATION_OPTIONS } from "@/store/modules/carEditor/actionTypes";

import AddNewOption from "./AddNewOption";

const props = defineProps({
  complectation: Object,
  complectationIndex: Number,
});

const store = useStore();

const optionCategories = computed(() => store.state.library.optionCategories);

const optionsByCategories = computed(
  () => store.getters["getOptionsByCategories"]
);

const getOptionsByCategory = (options, categoryId) =>
  options
    .filter((option) => option.category.id === categoryId)
    .map((option) => option.id);

const updateHandler = (value) => {
  store.dispatch(carEditorNamespace(SET_COMPLECTATION_OPTIONS), [
    props.complectationIndex,
    value,
  ]);
};
</script>
