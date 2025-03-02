<script setup lang="ts">
import { NCheckboxGroup, NCheckbox, NSpace, NScrollbar } from "naive-ui";
import { useBrandsStore } from "@/stores/brands.store";
import { useDealerEditorStore } from "@/stores/dealerEditor.store";

const brandsStore = useBrandsStore();
brandsStore.fetchBrands();
const dealerEditorStore = useDealerEditorStore();
</script>

<template>
  <NCheckboxGroup
    v-model:value="
      dealerEditorStore.dealerEditorState.brands as (string | number)[]
    "
  >
    <NScrollbar class="max-h-80">
      <NSpace vertical class="min-w-40">
        <NCheckbox
          v-for="brand in brandsStore.brands"
          :key="brand.id"
          :label="brand.displayName"
          :value="brand.id"
        />
      </NSpace>
    </NScrollbar>
  </NCheckboxGroup>
</template>
