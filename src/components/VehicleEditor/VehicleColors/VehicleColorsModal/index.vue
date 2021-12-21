<template>
  <n-modal
    :show="show"
    preset="card"
    :title="t('colors.add')"
    class="max-w-4xl"
    @update:show="toggleCallback"
  >
    <div class="flex justify-end mb-4">
      <n-button
        v-if="isColorsFormShowing"
        type="primary"
        size="medium"
        @click="discardColorForm"
      >
        {{ t("discard") }}
      </n-button>
      <n-button
        v-else
        type="primary"
        size="medium"
        @click="isColorsFormShowing = true"
      >
        {{ t("colors.addNew") }}
      </n-button>
    </div>
    <ColorForm v-if="isColorsFormShowing" :color="colorRef" />
    <ColorsList v-else />
  </n-modal>
</template>

<script>
export default {
  name: "VehicleColorsModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    toggleCallback: {
      type: Function,
    },
  },
};
</script>

<script setup>
import { ref, computed, provide } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NModal, NButton } from "naive-ui";
import ColorsList from "./ColorsList";
import ColorForm from "./ColorForm";
import { FETCH_COLORS } from "@/store/modules/library/actionTypes";

const store = useStore();
const { t } = useI18n();

const car = computed(() => store.state.carEditor.car);

store.dispatch(FETCH_COLORS, car.value.brand.id);

const colorTemplate = {
  id: null,
  name: "",
  closestShade: null,
  reference: null,
};

const isColorsFormShowing = ref(false);
const colorRef = ref({ ...colorTemplate });

const toggleColorForm = (val, editableColor = colorTemplate) => {
  colorRef.value = { ...editableColor };
  isColorsFormShowing.value = val;
};

const discardColorForm = () => {
  colorRef.value = { ...colorTemplate };
  isColorsFormShowing.value = false;
};

provide("toggleColorForm", toggleColorForm);
</script>
