<template>
  <div class="mb-6">
    <n-button type="primary" @click="openModal">
      {{ t("create") }}
    </n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddBrandButton",
});
</script>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { useI18n } from "vue-i18n";
import { useBrandsStore } from "@/stores/brands.store";

const brandsStore = useBrandsStore();
const { t } = useI18n();

const openModal = () => {
  brandsStore.isEdit = false;
  brandsStore.isModalOpen = true;
};
</script>
