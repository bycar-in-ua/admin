<script setup lang="ts">
import { ref } from "vue";
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
import { VehicleSizeClass } from "@bycar-in-ua/sdk";
import { useMutation } from "@tanstack/vue-query";
import { Close, InformationCircle } from "@vicons/ionicons5";
import i18n from "@/i18n";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import AIButton from "@/components/common/AIButton.vue";
import SizeClassesHint from "./SizeClassesHint.vue";

const vehicleTranslations = i18n.ua.vehicle;

const { t } = useI18n();
const showClassesHint = ref(false);

const vehicleStore = useVehicleStore();

const createOptions = (field) =>
  Object.keys(vehicleTranslations[field].items).map((item) => ({
    value: item,
    label: t(`vehicle.${field}.items.${item}`),
  }));

const sizeOptions = Object.values(VehicleSizeClass).map((size) => ({
  value: size,
  label: size,
}));

const { isPending, mutate: generateGeneralInfo } = useMutation({
  mutationKey: ["ai-general-info"],
  mutationFn: vehicleStore.generateGeneralInfo,
});
</script>

<template>
  <n-card
    :title="t('vehicle.generalCharacteristics.title')"
    size="small"
    class="my-4 shadow"
  >
    <template #header-extra>
      <AIButton
        quaternary
        size="small"
        @click="generateGeneralInfo"
        :loading="isPending"
      />
    </template>

    <n-form class="general-data grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <n-form-item :label="t('vehicle.bodyTypes.title')">
        <n-select
          v-model:value="vehicleStore.car.bodyType"
          :options="createOptions('bodyTypes')"
        />
      </n-form-item>
      <n-form-item>
        <template #label>
          <div class="flex items-center gap-2">
            {{ t("vehicle.sizeClases.title") }}
            <n-icon
              :size="16"
              class="cursor-pointer"
              @click="showClassesHint = true"
              ><InformationCircle
            /></n-icon>
            <SizeClassesHint v-model:show="showClassesHint" />
          </div>
        </template>

        <n-select
          v-model:value="vehicleStore.car.sizeClass"
          :options="sizeOptions"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.powerSteerings.title')">
        <n-select
          v-model:value="vehicleStore.car.powerSteering"
          :options="createOptions('powerSteerings')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.enginePlacements.title')">
        <n-select
          v-model:value="vehicleStore.car.enginePlacement"
          :options="createOptions('enginePlacements')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.numberOfDoors')">
        <n-input-number v-model:value="vehicleStore.car.numberOfDoors" />
      </n-form-item>
      <n-form-item :label="t('vehicle.discDiameter')">
        <n-input-number v-model:value="vehicleStore.car.discDiameter" />
      </n-form-item>
      <n-form-item
        :label="t('vehicle.generalCharacteristics.manufactureCountry')"
      >
        <n-input v-model:value="vehicleStore.car.manufactureCountry" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.crashTestsRate')">
        <n-rate v-model:value="vehicleStore.car.crashTestsRate" allow-half />
        <n-icon
          size="24"
          :title="t('clear')"
          class="cursor-pointer hover:text-red-400 transition-all"
          @click="vehicleStore.car.crashTestsRate = undefined"
        >
          <Close />
        </n-icon>
      </n-form-item>
      <n-form-item
        :label="t('vehicle.generalCharacteristics.crashTestsRateLink')"
      >
        <n-input v-model:value="vehicleStore.car.crashTestsRateLink" />
      </n-form-item>

      <n-form-item :label="t('vehicle.generalCharacteristics.warantyYears')">
        <n-input-number v-model:value="vehicleStore.car.warantyYears" />
      </n-form-item>
      <n-form-item
        :label="t('vehicle.generalCharacteristics.warantyYearsPaintwork')"
      >
        <n-input-number
          v-model:value="vehicleStore.car.warantyYearsPaintwork"
        />
      </n-form-item>
      <n-form-item
        :label="t('vehicle.generalCharacteristics.warantyYearsCorroison')"
      >
        <n-input-number
          v-model:value="vehicleStore.car.warantyYearsCorroison"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.warantyMileage')">
        <n-input-number v-model:value="vehicleStore.car.warantyMileage" />
      </n-form-item>

      <n-divider class="sm:col-span-2 md:col-span-3">
        {{ t("vehicle.generalCharacteristics.dimensions.title") }}
      </n-divider>
      <n-form-item :label="t('vehicle.generalCharacteristics.dimensions.l')">
        <n-input-number v-model:value="vehicleStore.car.dimensionL" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.dimensions.w')">
        <n-input-number v-model:value="vehicleStore.car.dimensionW" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.dimensions.h')">
        <n-input-number v-model:value="vehicleStore.car.dimensionH" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.wheelbase')">
        <n-input-number v-model:value="vehicleStore.car.wheelbase" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.clearance')">
        <n-input-number v-model:value="vehicleStore.car.clearance" />
      </n-form-item>
      <n-divider class="sm:col-span-2 md:col-span-3">
        {{ t("vehicle.generalCharacteristics.weightsNVolumes") }}
      </n-divider>
      <n-form-item :label="t('vehicle.generalCharacteristics.curbWeight')">
        <n-input-number v-model:value="vehicleStore.car.curbWeight" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.fullWeight')">
        <n-input-number v-model:value="vehicleStore.car.fullWeight" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.numberOfSeats')">
        <n-input-number v-model:value="vehicleStore.car.numberOfSeats" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.gasTankVolume')">
        <n-input-number v-model:value="vehicleStore.car.gasTankVolume" />
      </n-form-item>
      <n-form-item :label="t('vehicle.generalCharacteristics.trunkVolume')">
        <n-input-number v-model:value="vehicleStore.car.trunkVolume" />
      </n-form-item>
    </n-form>
  </n-card>
</template>

<style>
.general-data {
  .n-input-number {
    @apply w-full;
  }
}
</style>
