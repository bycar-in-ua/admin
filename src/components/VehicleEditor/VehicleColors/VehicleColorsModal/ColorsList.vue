<template>
  <div
    v-if="colors.length"
    class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4"
  >
    <ColorCard
      v-for="color in colors"
      :key="color.id"
      :color="color"
      :select-action="selectHandler"
      :edit-action="editHandler"
      :close-action="deleteHandler"
      :selected="selectedColors.includes(color.id)"
      editable
    />
  </div>
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

<script>
export default {
  name: "ColorsList",
};
</script>

<script setup>
import { computed, inject, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NEmpty, NButton } from "naive-ui";
import { DELETE_COLOR } from "@/store/modules/library/actionTypes";
import ColorCard from "../ColorCard";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { SAVE_CAR_COLORS } from "@/store/modules/carEditor/actionTypes";

const store = useStore();
const { t } = useI18n();
const toggleModal = inject("toggleColorsModal");
const toggleColorForm = inject("toggleColorForm");

const car = computed(() => store.state.carEditor.car);
const colors = computed(() => store.state.library.colors);

const isFetching = ref(false);
const selectedColors = ref(car.value.colors.map((c) => c.id));

const selectHandler = (color, selected) => {
  if (selected) {
    selectedColors.value = selectedColors.value.filter(
      (colorId) => colorId !== color.id
    );
    return;
  }
  selectedColors.value.push(color.id);
};

const editHandler = (color) => {
  toggleColorForm(true, color);
};

const deleteHandler = async (color) => {
  await store.dispatch(DELETE_COLOR, color.id);
};

const saveHandler = async () => {
  try {
    isFetching.value = true;
    await store.dispatch(
      carEditorNamespace(SAVE_CAR_COLORS),
      selectedColors.value
    );
    toggleModal(false);
  } finally {
    isFetching.value = false;
  }
};
</script>
