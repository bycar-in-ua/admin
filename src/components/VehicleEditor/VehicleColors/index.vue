<template>
  <n-card :title="t('colors.title', 2)" class="my-4 shadow">
    <div
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <ColorCard
        v-for="color in colors"
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
  <VehicleColorsModal :show="isModalOpen" :toggle-callback="toggleModal" />
</template>

<script>
export default {
  name: "VehicleColors",
};
</script>

<script setup>
import { ref, provide, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NCard, NButton } from "naive-ui";
import VehicleColorsModal from "./VehicleColorsModal";
import ColorCard from "./ColorCard";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { SAVE_CAR_COLORS } from "@/store/modules/carEditor/actionTypes";

const store = useStore();
const { t } = useI18n();

const colors = computed(() => store.state.carEditor.car.colors);

const isModalOpen = ref(false);

const toggleModal = (val) => {
  isModalOpen.value = val;
};

const removeColorHandler = async (color) => {
  await store.dispatch(
    carEditorNamespace(SAVE_CAR_COLORS),
    colors.value.map((c) => c.id).filter((colorId) => colorId !== color.id)
  );
};

provide("toggleColorsModal", toggleModal);
</script>
