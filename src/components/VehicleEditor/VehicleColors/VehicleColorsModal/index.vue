<template>
  <n-modal
    preset="card"
    :title="t('colors.add')"
    class="max-w-4xl"
    :on-update:show="(val) => $emit('update:show', val)"
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
    <ColorForm
      v-if="isColorsFormShowing"
      :color="colorRef"
      @toggle-form="(val) => toggleColorForm(val)"
    />
    <ColorsList
      v-else
      @toggle-modal="(val) => $emit('update:show', val)"
      @toggle-form="(val, color) => toggleColorForm(val, color)"
    />
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VehicleColorsModal",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NModal, NButton } from "naive-ui";
import ColorsList from "./ColorsList.vue";
import ColorForm from "./ColorForm.vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useColorsStore } from "@/stores/vehicleEditor/colors.store";
import { ColorDto as Color } from "@bycar-in-ua/common";

defineEmits(["update:show"]);

const vehicleStore = useVehicleStore();
const colorsStore = useColorsStore();
const { t } = useI18n();

colorsStore.fetchColors(vehicleStore.car.brandId);

const colorTemplate: Color = {
  id: null,
  name: "",
  closestShade: null,
  reference: null,
  brandIdentityId: vehicleStore.car.brandId,
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
</script>
