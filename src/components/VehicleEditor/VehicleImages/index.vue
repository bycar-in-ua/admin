<template>
  <n-card :title="t('images.title', 2)" size="medium">
    <n-image-group>
      <div class="grid gap-4 grid-cols-3 md:grid-cols-5 xl:grid-cols-7">
        <n-image
          v-for="image in images"
          :key="image.id"
          :src="cdnLink(image.path, 300, 300)"
          :preview-src="cdnLink(image.path)"
          class=""
        />
      </div>
    </n-image-group>
    <template #action>
      <div class="flex justify-end">
        <n-button type="primary" size="medium" @click="openModal">
          {{ t("images.addNew", 2) }}
        </n-button>
      </div>
    </template>
  </n-card>
  <VehicleImagesModal :show="isModalOpen" :close-callback="closeModal" />
</template>

<script>
export default {
  name: "VehicleImages",
};
</script>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NCard, NImage, NImageGroup, NButton } from "naive-ui";
import { cdnLink } from "@/helpers/cdn";
import VehicleImagesModal from "./VehicleImagesModal";

const store = useStore();

const images = computed(() => store.state.carEditor.car.images);

const { t } = useI18n();

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = (val) => {
  isModalOpen.value = val;
};
</script>
