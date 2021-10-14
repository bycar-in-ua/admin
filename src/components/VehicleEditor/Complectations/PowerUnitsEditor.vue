<template>
  <n-collapse>
    <n-collapse-item
      v-for="(powerUnit, index) in complectation.powerUnits"
      :key="index"
      :title="getPowerUnitName(powerUnit)"
      :name="index"
    >
      <n-form class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <n-form-item :label="t('vehicle.engine.title')">
          <n-select
            :options="engineOptions"
            :value="powerUnit.engine.id"
            :on-update:value="selectHandler('engine', index)"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.powerUnits.transmission')">
          <n-select
            :options="transmissionOptions"
            :value="powerUnit.transmission.id"
            :on-update:value="selectHandler('transmission', index)"
          />
        </n-form-item>
        <n-form-item :label="t('price')">
          <n-input-number
            class="w-full"
            :show-button="false"
            :value="powerUnit.price"
            :on-update:value="inputHandler('price', index)"
          >
            <template #prefix> $ </template>
          </n-input-number>
        </n-form-item>

        <n-form-item
          :label="t('vehicle.powerUnits.consumption')"
          class="col-span-2 md:col-span-3"
        >
          <n-input-number
            class="text-center w-full"
            :show-button="false"
            :value="powerUnit.consumption.city"
            :on-update:value="inputHandler('consumption.city', index)"
          >
            <template #prefix> {{ t("city") }} </template>
            <template #suffix> {{ t("units.volume") }} </template>
          </n-input-number>
          <n-input-number
            class="text-center w-full"
            :show-button="false"
            :value="powerUnit.consumption.highway"
            :on-update:value="inputHandler('consumption.highway', index)"
          >
            <template #prefix> {{ t("highway") }} </template>
            <template #suffix> {{ t("units.volume") }} </template>
          </n-input-number>
          <n-input-number
            class="text-center w-full"
            :show-button="false"
            :value="powerUnit.consumption.mixed"
            :on-update:value="inputHandler('consumption.mixed', index)"
          >
            <template #prefix> {{ t("mixed") }} </template>
            <template #suffix> {{ t("units.volume") }} </template>
          </n-input-number>
        </n-form-item>

        <n-form-item :label="t('vehicle.powerUnits.speedUp100')">
          <n-input-number
            class="w-full"
            :value="powerUnit.speedUp100"
            :on-update:value="inputHandler('speedUp100', index)"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.powerUnits.maxSpeed')">
          <n-input-number
            class="w-full"
            :value="powerUnit.maxSpeed"
            :on-update:value="inputHandler('maxSpeed', index)"
          />
        </n-form-item>
      </n-form>
    </n-collapse-item>
  </n-collapse>
</template>
<script>
export default {
  name: "PowerUnitsEditor",
};
</script>

<script setup>
import { defineProps, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {
  NCollapse,
  NCollapseItem,
  NForm,
  NFormItem,
  NInputNumber,
  NSelect,
} from "naive-ui";
import { getGearboxType } from "@/helpers/transmissionHelpers";
import { carEditorNamespace } from "@/store/modules/carEditor";
import { SET_POWER_UNIT_OPTION } from "@/store/modules/carEditor/actionTypes";

const props = defineProps({
  complectation: Object,
  complectationIndex: Number,
});

const store = useStore();
const { t } = useI18n();

const engines = computed(() => store.state.carEditor.car.engines);
const transmissions = computed(() => store.state.carEditor.car.transmissions);

const engineOptions = engines.value.map((engine) => ({
  label: engine.displayName,
  value: engine.id,
}));

const transmissionOptions = transmissions.value.map((transmission) => ({
  label: `${transmission.drive} - ${transmission?.gearbox?.numberOfGears} ${
    getGearboxType(transmission?.gearbox?.type)?.label
  }`,
  value: transmission.id,
}));

const getPowerUnitName = (powerUnit) =>
  [
    powerUnit.engine?.displayName,
    powerUnit.transmission?.drive,
    powerUnit.transmission?.gearbox?.numberOfGears,
    getGearboxType(powerUnit.transmission?.gearbox?.type)?.label,
  ].join(" ");

const getSelectedItem = (itemType, itemId) => {
  switch (itemType) {
    case "engine":
      return engines.value.find((engine) => engine.id === itemId);
    case "transmission":
      return transmissions.value.find(
        (transmission) => transmission.id === itemId
      );
    default:
      return {};
  }
};

const selectHandler = (field, powerUnitIndex) => (value) => {
  store.dispatch(carEditorNamespace(SET_POWER_UNIT_OPTION), [
    props.complectationIndex,
    powerUnitIndex,
    field,
    getSelectedItem(field, value),
  ]);
};

const inputHandler = (field, powerUnitIndex) => (value) => {
  store.dispatch(carEditorNamespace(SET_POWER_UNIT_OPTION), [
    props.complectationIndex,
    powerUnitIndex,
    field,
    value,
  ]);
};
</script>
