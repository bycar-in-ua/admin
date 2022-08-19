<template>
  <n-card :title="t('images.title', 2)" class="my-4 shadow">
    <n-image-group>
      <div class="grid gap-4 grid-cols-3 md:grid-cols-5 xl:grid-cols-7">
        <vehicle-image-card
          v-for="image in vehicleStore.images"
          :key="image.id"
          :image="image"
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
  <VehicleImagesModal v-model:show="isModalOpen" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VehicleImages",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NCard, NImageGroup, NButton } from "naive-ui";
import VehicleImagesModal from "./VehicleImagesModal.vue";
import VehicleImageCard from "./VehicleImageCard.vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";

const vehicleStore = useVehicleStore();

const { t } = useI18n();

const isModalOpen = ref(false);
</script>
