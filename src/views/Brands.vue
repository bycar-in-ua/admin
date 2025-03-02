<template>
  <brands-grid />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddBrandButton from "@/components/Brands/AddBrandButton.vue";
import BrandsGrid from "@/components/Brands/BrandsGrid.vue";

export default defineComponent({
  name: "BrandsView",
  components: { AddBrandButton, BrandsGrid,  },
});
</script>
