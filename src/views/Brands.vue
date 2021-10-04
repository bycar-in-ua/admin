<template>
  <add-brand-button />
  <brands-grid />
  <brand-modal />
</template>

<script>
import AddBrandButton from "../components/Brands/AddBrandButton";
import BrandModal from "../components/Brands/BrandModal.vue";
import BrandsGrid from "../components/Brands/BrandsGrid";
export default {
  name: "BrandsView",
  components: { AddBrandButton, BrandsGrid, BrandModal },
};
</script>
