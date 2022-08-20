<template>
  <n-scrollbar v-if="colorsStore.$state.length" class="max-h-4/5 pr-4">
    <div
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <ColorCard
        v-for="color in colorsStore.$state"
        :key="color.id"
        :color="color"
        :select-action="selectHandler"
        :edit-action="editHandler"
        :close-action="deleteHandler"
        :selected="selectedColors.includes(color.id)"
        editable
      />
    </div>
  </n-scrollbar>
  <n-empty v-else size="large" :show-description="false" class="p-4" />
  <div class="flex justify-end mt-4">
    <n-button
      type="primary"
      :disabled="!selectedColors.length || isFetching"
      :loading="isFetching"
      @click="saveHandler"
    >
      {{ t("save") }}
    </n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ColorsList",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NEmpty, NButton, NScrollbar } from "naive-ui";
import ColorCard from "../ColorCard.vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useColorsStore } from "@/stores/vehicleEditor/colors.store";

const emit = defineEmits(["toggle-modal", "toggle-form"]);

const vehicleStore = useVehicleStore();
const colorsStore = useColorsStore();
const { t } = useI18n();

const isFetching = ref(false);
const selectedColors = ref(vehicleStore.colors?.map((c) => c.id));

const selectHandler = (color, selected) => {
  if (selected) {
    selectedColors.value = selectedColors.value?.filter(
      (colorId) => colorId !== color.id
    );
    return;
  }
  selectedColors.value?.push(color.id);
};

const editHandler = (color) => {
  emit("toggle-form", true, color);
};

const deleteHandler = async (color) => {
  await colorsStore.deleteColor(color.id);
};

const saveHandler = async () => {
  try {
    isFetching.value = true;
    await vehicleStore.saveSomething(selectedColors.value, "colors");
    emit("toggle-modal", false);
  } finally {
    isFetching.value = false;
  }
};
</script>
