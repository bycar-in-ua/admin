<template>
  <n-card
    :title="t('vehicle.generalCharacteristics.title')"
    size="small"
    class="my-4 shadow"
  >
    <n-form class="general-data grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <n-form-item :label="t('vehicle.bodyTypes.title')">
        <n-select
          v-model:value="car.bodyType"
          :options="createOptions('bodyTypes')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.sizeClases.title')">
        <n-select
          v-model:value="car.sizeClass"
          :options="createOptions('sizeClases')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.powerSteerings.title')">
        <n-select
          v-model:value="car.powerSteering"
          :options="createOptions('powerSteerings')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.enginePlacements.title')">
        <n-select
          v-model:value="car.enginePlacement"
          :options="createOptions('enginePlacements')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.numberOfDoors')">
        <n-input-number v-model:value="car.numberOfDoors" />
      </n-form-item>
      <n-form-item :label="t('vehicle.discDiameter')">
        <n-input-number v-model:value="car.discDiameter" />
      </n-form-item>
      <n-form-item
        :label="t('vehicle.generalCharacteristics.manufactureCountry')"
      >
        <n-input v-model:value="car.manufactureCountry" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.crashTestsRate')">
        <n-rate v-model:value="car.crashTestsRate" allow-half />
        <n-icon
          size="24"
          :title="t('clear')"
          class="cursor-pointer hover:text-red-400 transition-all"
          @click="car.crashTestsRate = undefined"
        >
          <Close />
        </n-icon>
      </n-form-item>
      <n-form-item
        :label="t('vehicle.generalCharacteristics.crashTestsRateLink')"
      >
        <n-input v-model:value="car.crashTestsRateLink" />
      </n-form-item>

      <n-form-item :label="t('vehicle.generalCharacteristics.warantyYears')">
        <n-input-number v-model:value="car.warantyYears" />
      </n-form-item>
      <n-form-item
        :label="t('vehicle.generalCharacteristics.warantyYearsPaintwork')"
      >
        <n-input-number v-model:value="car.warantyYearsPaintwork" />
      </n-form-item>
      <n-form-item
        :label="t('vehicle.generalCharacteristics.warantyYearsCorroison')"
      >
        <n-input-number v-model:value="car.warantyYearsCorroison" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.warantyMileage')">
        <n-input-number v-model:value="car.warantyMileage" />
      </n-form-item>

      <n-divider class="sm:col-span-2 md:col-span-3">
        {{ t("vehicle.generalCharacteristics.dimensions.title") }}
      </n-divider>
      <n-form-item :label="t('vehicle.generalCharacteristics.dimensions.l')">
        <n-input-number v-model:value="car.dimensionL" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.dimensions.w')">
        <n-input-number v-model:value="car.dimensionW" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.dimensions.h')">
        <n-input-number v-model:value="car.dimensionH" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.wheelbase')">
        <n-input-number v-model:value="car.wheelbase" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.clearance')">
        <n-input-number v-model:value="car.clearance" />
      </n-form-item>
      <n-divider class="sm:col-span-2 md:col-span-3">
        {{ t("vehicle.generalCharacteristics.weightsNVolumes") }}
      </n-divider>
      <n-form-item :label="t('vehicle.generalCharacteristics.curbWeight')">
        <n-input-number v-model:value="car.curbWeight" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.fullWeight')">
        <n-input-number v-model:value="car.fullWeight" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.numberOfSeats')">
        <n-input-number v-model:value="car.numberOfSeats" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.gasTankVolume')">
        <n-input-number v-model:value="car.gasTankVolume" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.trunkVolume')">
        <n-input-number v-model:value="car.trunkVolume" />
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GeneralOptions",
});
</script>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import {
  NCard,
  NDivider,
  NForm,
  NFormItem,
  NInputNumber,
  NInput,
  NRate,
  NSelect,
  NIcon,
} from "naive-ui";
import { Close } from "@vicons/ionicons5";
import i18n from "@/i18n";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";

const vehicleTranslations = i18n.ua.vehicle;

const { t } = useI18n();

const car = useVehicleStore();

const createOptions = (field) =>
  Object.keys(vehicleTranslations[field].items).map((item) => ({
    value: item,
    label: t(`vehicle.${field}.items.${item}`),
  }));
</script>

<style lang="postcss">
.general-data {
  .n-input-number {
    @apply w-full;
  }
}
</style>
