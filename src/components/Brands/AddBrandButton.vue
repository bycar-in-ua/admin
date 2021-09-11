<template>
  <div class="mb-6">
    <n-button type="primary" @click="openModal">Создать</n-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NButton } from "naive-ui";
import { OPEN_BRAND_MODAL } from "@/store/modules/brands/modal/actionTypes";
import { brandNamespace } from "@/store/modules/brands";

export default {
  name: "AddBrandButton",
  components: {
    NButton,
  },
  methods: {
    ...mapActions({
      openCreateBrandModal: brandNamespace(OPEN_BRAND_MODAL),
    }),
    openModal() {
      this.openCreateBrandModal();
    },
  },
};
</script>
