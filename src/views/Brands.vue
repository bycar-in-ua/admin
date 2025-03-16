<template>
  <brands-grid />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BrandsGrid from "@/Brands/BrandsGrid.vue";

export default defineComponent({
  name: "BrandsView",
  components: { BrandsGrid },
});
</script>
