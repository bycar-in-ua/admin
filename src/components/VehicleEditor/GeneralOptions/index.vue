<template>
  <n-card
    :title="t('vehicle.generalCharacteristics.title')"
    size="small"
    class="my-4 shadow"
  >
    <n-form class="general-data grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <n-form-item :label="t('vehicle.bodyTypes.title')">
        <n-select
          :value="car.bodyType"
          :options="createOptions('bodyTypes')"
          :on-update:value="inputHandler('bodyType')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.sizeClases.title')">
        <n-select
          :value="car.sizeClass"
          :options="createOptions('sizeClases')"
          :on-update:value="inputHandler('sizeClass')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.powerSteerings.title')">
        <n-select
          :value="car.powerSteering"
          :options="createOptions('powerSteerings')"
          :on-update:value="inputHandler('powerSteering')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.enginePlacements.title')">
        <n-select
          :value="car.enginePlacement"
          :options="createOptions('enginePlacements')"
          :on-update:value="inputHandler('enginePlacement')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.numberOfDoors')">
        <n-input-number
          :value="car.numberOfDoors"
          :on-update:value="inputHandler('numberOfDoors')"
        />
      </n-form-item>

      <n-divider class="sm:col-span-2 md:col-span-3">
        {{ t("vehicle.generalCharacteristics.dimensions.title") }}
      </n-divider>
      <n-form-item :label="t('vehicle.generalCharacteristics.dimensions.l')">
        <n-input-number
          :value="car.dimensionL"
          :on-update:value="inputHandler('dimensionL')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.dimensions.w')">
        <n-input-number
          :value="car.dimensionW"
          :on-update:value="inputHandler('dimensionW')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.dimensions.h')">
        <n-input-number
          :value="car.dimensionH"
          :on-update:value="inputHandler('dimensionH')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.wheelbase')">
        <n-input-number
          :value="car.wheelbase"
          :on-update:value="inputHandler('wheelbase')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.clearance')">
        <n-input-number
          :value="car.clearance"
          :on-update:value="inputHandler('clearance')"
        />
      </n-form-item>
      <n-divider class="sm:col-span-2 md:col-span-3">
        {{ t("vehicle.generalCharacteristics.weightsNVolumes") }}
      </n-divider>
      <n-form-item :label="t('vehicle.generalCharacteristics.curbWeight')">
        <n-input-number
          :value="car.curbWeight"
          :on-update:value="inputHandler('curbWeight')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.fullWeight')">
        <n-input-number
          :value="car.fullWeight"
          :on-update:value="inputHandler('fullWeight')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.numberOfSeats')">
        <n-input-number
          :value="car.numberOfSeats"
          :on-update:value="inputHandler('numberOfSeats')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.gasTankVolume')">
        <n-input-number
          :value="car.gasTankVolume"
          :on-update:value="inputHandler('gasTankVolume')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.trunkVolume')">
        <n-input-number
          :value="car.trunkVolume"
          :on-update:value="inputHandler('trunkVolume')"
        />
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script>
export default {
  name: "GeneralOptions",
};
</script>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {
  NCard,
  NDivider,
  NForm,
  NFormItem,
  NInputNumber,
  NSelect,
} from "naive-ui";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { UPDATE_CAR_FIELD } from "@/store/modules/carEditor/mutationTypes";
import { vehicleRU as vehicleTranslations } from "@/i18n/vehicle";

const store = useStore();
const { t } = useI18n();

const car = computed(() => store.state.carEditor.car);

const inputHandler = (field) => (val) => {
  store.commit(carEditorNamespace(UPDATE_CAR_FIELD), [field, val]);
};

const createOptions = (field) =>
  Object.keys(vehicleTranslations[field].items).map((item) => ({
    value: item,
    label: t(`vehicle.${field}.items.${item}`),
  }));
</script>

<style lang="scss">
.general-data {
  .n-input-number {
    @apply w-full;
  }
}
</style>
