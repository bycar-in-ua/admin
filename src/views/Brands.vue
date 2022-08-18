<template>
  <add-brand-button />
  <brands-grid />
  <brand-modal />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddBrandButton from "@/components/Brands/AddBrandButton.vue";
import BrandModal from "@/components/Brands/BrandModal.vue";
import BrandsGrid from "@/components/Brands/BrandsGrid.vue";

export default defineComponent({
  name: "BrandsView",
  components: { AddBrandButton, BrandsGrid, BrandModal },
});
</script>
