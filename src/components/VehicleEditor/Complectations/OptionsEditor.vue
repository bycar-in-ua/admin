<template>
  <n-collapse>
    <n-collapse-item
      v-for="category in optionCategories"
      :key="category.id"
      :title="category.displayName"
      :name="category.id"
    >
      <n-transfer
        virtual-scroll
        filterable
        :options="optionsByCategories[category.id]"
        :value="getOptionsByCategory(complectation.options, category.id)"
        :on-update:value="updateHandler(complectationIndex)"
      />
    </n-collapse-item>
  </n-collapse>
</template>

<script>
export default {
  name: "OptionsEditor",
  props: {
    complectation: Object,
    complectationIndex: Number,
  },
};
</script>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { NTransfer, NCollapse, NCollapseItem } from "naive-ui";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { SET_COMPLECTATION_OPTIONS } from "@/store/modules/carEditor/actionTypes";

const store = useStore();

const optionCategories = computed(() => store.state.library.optionCategories);

const optionsByCategories = computed(
  () => store.getters["getOptionsByCategories"]
);

const getOptionsByCategory = (options, categoryId) =>
  options
    .filter((option) => option.category.id === categoryId)
    .map((option) => option.id);

const updateHandler = (complectationIndex) => (value) => {
  store.dispatch(carEditorNamespace(SET_COMPLECTATION_OPTIONS), [
    complectationIndex,
    value,
  ]);
};
</script>
