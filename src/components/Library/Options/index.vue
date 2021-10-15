<template>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <OptionCategoryList
      v-for="optionCategory in optionCategories"
      :key="optionCategory.id"
      :option-category="optionCategory"
      :options="optionsByCategories[optionCategory.id]"
    />
  </div>
</template>

<script>
export default {
  name: "Options",
};
</script>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import {
  FETCH_OPTIONS,
  FETCH_OPTION_CATEGORIES,
} from "@/store/modules/library/actionTypes";
import OptionCategoryList from "./OptionCategoryList";

const store = useStore();

store.dispatch(FETCH_OPTION_CATEGORIES);
store.dispatch(FETCH_OPTIONS);

const optionCategories = computed(() => store.state.library.optionCategories);
const optionsByCategories = computed(
  () => store.getters.getOptionsByCategories
);
</script>
