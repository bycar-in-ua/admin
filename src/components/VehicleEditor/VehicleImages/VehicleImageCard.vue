<script setup lang="ts">
import { ref } from "vue";
import { NIcon, NImage, NSpin } from "naive-ui";
import { CloseCircleOutline } from "@vicons/ionicons5";
import { cdnLink } from "@/helpers/cdn";
import type { Image } from "@bycar-in-ua/sdk";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";

const props = defineProps<{ image: Image }>();

const vehicleStore = useVehicleStore();

const isDeleting = ref(false);

const deleteHandler = async () => {
  try {
    isDeleting.value = true;

    const imagesToSave = vehicleStore.carImagesIds?.filter(
      (imageId) => imageId != props.image.id
    );

    await vehicleStore.saveSomething(imagesToSave, "images");
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <div class="vehicle-image-card">
    <n-icon class="vehicle-image-card__delete-icon" @click="deleteHandler">
      <close-circle-outline />
    </n-icon>
    <div
      v-if="isDeleting"
      class="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center bg-red-500 bg-opacity-50"
    >
      <n-spin size="medium" stroke="red" />
    </div>
    <n-image
      :src="cdnLink(image.path, 300, 300)"
      :preview-src="cdnLink(image.path)"
    />
  </div>
</template>

<style>
.vehicle-image-card {
  @apply relative;
  &:hover {
    .vehicle-image-card__delete-icon {
      @apply opacity-100;
    }
  }
  &__delete-icon {
    @apply absolute -left-4 -top-4 text-3xl transition-all opacity-0 cursor-pointer;
    &:hover {
      @apply text-red-600;
    }
  }
}
</style>
