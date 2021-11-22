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
        :value="getOptionsByCategory(category.id)"
        :on-update:value="updateHandler(category.id)"
        size="large"
        class="options-transfer"
      />
      <add-new-option :category-id="category.id" form-class="mt-4" />
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
import AddNewOption from "@/components/common/AddNewOption";
import { CHANGE_OPTIONS } from "@/store/modules/carEditor/options/actionTypes";

const props = defineProps({
  complectation: Object,
  complectationIndex: Number,
});

const store = useStore();

const optionCategories = computed(() => store.state.library.optionCategories);

const optionsByCategories = computed(
  () => store.getters["getOptionsByCategories"]
);

const complectationOptionByCategories = computed(
  () => store.state.carEditor.options[props.complectation.id]
);

const getOptionsByCategory = (catId) =>
  complectationOptionByCategories.value[catId] || [];

const updateHandler = (catId) => (value) => {
  store.dispatch(carEditorNamespace(CHANGE_OPTIONS), [
    props.complectation.id,
    catId,
    value,
  ]);
};
</script>

<style lang="scss">
.options-transfer {
  &.n-transfer {
    width: 100%;
    .n-transfer-list
      .n-transfer-list-body
      .n-transfer-list-flex-container
      .n-transfer-list-content
      .n-transfer-list-item {
      height: auto;
      max-height: 100%;
      @apply py-1;
    }
  }
}
</style>
