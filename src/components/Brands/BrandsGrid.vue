<template>
  <div
    class="
      my-4
      grid grid-cols-2
      md:grid-cols-4
      xl:grid-cols-6
      2xl:grid-cols-8
      gap-4
    "
  >
    <n-card
      v-for="brand in brands"
      :key="brand.id"
      hoverable
      class="cursor-pointer shadow-lg"
      @click="openBrandModal(brand)"
    >
      <template #cover>
        <img :src="brand.logo" class="h-32 p-2 object-contain" />
      </template>
      <n-h3 v-text="brand.displayName" class="text-center mb-0 break-all" />
    </n-card>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { brandNamespace } from "@/store/modules/brands";
import { OPEN_BRAND_MODAL } from "@/store/modules/brands/modal/actionTypes";
import { FETCH_BRANDS } from "@/store/modules/brands/actionTypes";
import { NCard, NH3 } from "naive-ui";

export default {
  name: "BrandGrid",
  setup() {
    const store = useStore();

    store.dispatch(brandNamespace(FETCH_BRANDS));

    const brands = computed(() => store.state.brands.all);

    const openBrandModal = (brand) =>
      store.dispatch(brandNamespace(OPEN_BRAND_MODAL), brand);

    return {
      brands,
      openBrandModal,
    };
  },
  components: {
    NCard,
    NH3,
  },
};
</script>
