<template>
  <div
    class="my-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
  >
    <n-card
      v-for="brand in brandsStore.brands"
      :key="brand.id"
      hoverable
      class="cursor-pointer shadow-lg"
      @click="openBrandModal(brand)"
    >
      <template #cover>
        <img
          :src="cdnLink(brand.logo, 'thumbnail')"
          class="h-32 p-2 object-contain"
        />
      </template>
      <n-h3 class="text-center mb-0 break-all">
        {{ brand.displayName }}
      </n-h3>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NCard, NH3 } from "naive-ui";
import { cdnLink } from "@/helpers/cdn";
import { useBrandsStore, useBrandModalStore } from "@/stores/brands.store";

export default defineComponent({
  name: "BrandGrid",
  components: {
    NCard,
    NH3,
  },
  setup() {
    const brandsStore = useBrandsStore();
    const brandModalStore = useBrandModalStore();
    brandsStore.fetchBrands();

    const openBrandModal = (brand) => {
      brandsStore.isEdit = true;
      brandModalStore.$state = brand;
      brandsStore.isModalOpen = true;
    };

    return {
      brandsStore,
      openBrandModal,
      cdnLink,
    };
  },
});
</script>
