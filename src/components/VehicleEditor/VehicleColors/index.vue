<template>
  <n-card :title="t('colors.title', 2)" class="my-4 shadow">
    <div
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <ColorCard
        v-for="color in vehicleStore.car.colors"
        :key="color.id"
        :color="color"
        :close-action="removeColorHandler"
      />
    </div>
    <template #action>
      <div class="flex justify-end">
        <n-button type="primary" size="medium" @click="isModalOpen = true">
          {{ t("colors.add") }}
        </n-button>
      </div>
    </template>
  </n-card>
  <VehicleColorsModal v-model:show="isModalOpen" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VehicleColors",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NCard, NButton } from "naive-ui";
import VehicleColorsModal from "./VehicleColorsModal/index.vue";
import ColorCard from "./ColorCard.vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { ColorDto as Color } from "@bycar-in-ua/common";

const vehicleStore = useVehicleStore();
const { t } = useI18n();

const isModalOpen = ref(false);

const removeColorHandler = async (colorToRemove: Color) => {
  const colorsToSave = vehicleStore.car.colors?.map((color) =>
    color.id != colorToRemove.id ? color.id : NaN
  );
  await vehicleStore.saveSomething(colorsToSave, "colors");
};
</script>
