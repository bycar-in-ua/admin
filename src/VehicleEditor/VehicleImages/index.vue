<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NCard, NImageGroup, NButton } from "naive-ui";
import type { Image } from "@bycar-in-ua/sdk";
import { DraggableImageCard } from "@/components/Images";
import VehicleImagesModal from "./VehicleImagesModal.vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";

const vehicleStore = useVehicleStore();

const { t } = useI18n();

const isModalOpen = ref(false);

function onDrop(evt: DragEvent) {
  const draggableImageId = Number(evt.dataTransfer.getData("imageId"));
  const draggedImageIndex = vehicleStore.car.images.findIndex(
    ({ imageId }) => imageId === draggableImageId
  );

  const targetImageIndex = Number(
    (evt.target as HTMLElement)?.parentElement?.dataset.index
  );

  if (isNaN(targetImageIndex) || draggedImageIndex === targetImageIndex) {
    return;
  }

  const images = [...vehicleStore.car.images];

  images.splice(targetImageIndex, 0, images.splice(draggedImageIndex, 1)[0]);

  vehicleStore.car.images = images.map((image, index) => ({
    ...image,
    order: index + 1,
  }));
}

function deleteImageHandler(image: Image) {
  const targetImageIndex = vehicleStore.car.images.findIndex(
    ({ imageId }) => image.id === imageId
  );

  if (targetImageIndex === -1) {
    return;
  }

  vehicleStore.car.images.splice(targetImageIndex, 1);
}
</script>

<template>
  <n-card :title="t('images.title', 2)" class="my-4 shadow">
    <n-image-group>
      <div
        class="grid gap-4 grid-cols-3 md:grid-cols-5 xl:grid-cols-7"
        @drop="onDrop"
        @dragover.prevent
        @dragenter.prevent
      >
        <DraggableImageCard
          v-for="({ imageId, image }, index) in vehicleStore.car.images"
          :key="imageId"
          :index
          :image="image"
          @delete="deleteImageHandler"
        />
      </div>
    </n-image-group>
    <template #action>
      <div class="flex justify-end">
        <n-button type="primary" size="medium" @click="isModalOpen = true">
          {{ t("images.add", 2) }}
        </n-button>
      </div>
    </template>
  </n-card>
  <VehicleImagesModal v-if="isModalOpen" v-model:open="isModalOpen" />
</template>
