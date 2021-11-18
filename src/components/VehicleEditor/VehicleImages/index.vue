<template>
  <n-card :title="t('images.title', 2)" class="my-4 shadow">
    <n-image-group>
      <div class="grid gap-4 grid-cols-3 md:grid-cols-5 xl:grid-cols-7">
        <vehicle-image-card
          v-for="image in images"
          :key="image.id"
          :image="image"
        />
      </div>
    </n-image-group>
    <template #action>
      <div class="flex justify-end">
        <n-button type="primary" size="medium" @click="openModal">
          {{ t("images.add", 2) }}
        </n-button>
      </div>
    </template>
  </n-card>
  <VehicleImagesModal :show="isModalOpen" :toggle-callback="toggleModal" />
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
import { NCard, NImageGroup, NButton } from "naive-ui";
import VehicleImagesModal from "./VehicleImagesModal";
import VehicleImageCard from "./VehicleImageCard";

const store = useStore();

const images = computed(() => store.state.carEditor.car.images);

const { t } = useI18n();

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const toggleModal = (val) => {
  isModalOpen.value = val;
};
</script>
