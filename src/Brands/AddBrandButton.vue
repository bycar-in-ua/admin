<script setup lang="ts">
import { NButton } from "naive-ui";
import { useI18n } from "vue-i18n";
import { useBrandsStore } from "@/stores/brands.store";
import BrandModal from "./BrandModal.vue";

defineOptions({
  name: "AddBrandButton",
});

const brandsStore = useBrandsStore();
const { t } = useI18n();

const openModal = () => {
  brandsStore.isEdit = false;
  brandsStore.isModalOpen = true;
};
</script>

<template>
  <div class="mb-6">
    <n-button type="primary" @click="openModal">
      {{ t("create") }}
    </n-button>

    <BrandModal />
  </div>
</template>
