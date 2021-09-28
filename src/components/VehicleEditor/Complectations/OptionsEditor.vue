<template>
  <n-collapse>
    <n-collapse-item
      v-for="cat in optionCategories"
      :key="cat.id"
      :title="cat.displayName"
      :name="cat.id"
    >
      <n-transfer
        virtual-scroll
        filterable
        :options="optionsByCategories[cat.id]"
      />
    </n-collapse-item>
  </n-collapse>
</template>

<script>
export default {
  name: "OptionsEditor",
};
</script>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { NTransfer, NCollapse, NCollapseItem } from "naive-ui";

const store = useStore();

const optionCategories = computed(() => store.state.library.optionCategories);

const optionsByCategories = computed(
  () => store.getters["getOptionsByCategories"]
);
</script>
