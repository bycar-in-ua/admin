<template>
  <n-collapse>
    <n-collapse-item
      v-for="(powerUnit, index) in complectation.powerUnits"
      :key="powerUnit.id"
      :title="getPowerUnitName(powerUnit)"
      :name="powerUnit.id"
    >
      <n-form class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <n-form-item :label="t('vehicle.engine.title')">
          <n-select
            :options="engineOptions"
            :value="powerUnit.engine"
            :on-update:value="selectHandler('engine', index)"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.powerUnits.transmission')">
          <n-select
            :options="transmissionOptions"
            :value="powerUnit.transmission"
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
          class="col-span-2 md:col-span-3 -mx-2"
        >
          <n-input-number
            class="text-center w-full mx-2"
            :show-button="false"
            :value="powerUnit.consumption.city"
            :on-update:value="inputHandler('consumption.city', index)"
          >
            <template #prefix> {{ t("city") }} </template>
            <template #suffix> {{ t("units.volume") }} </template>
          </n-input-number>
          <n-input-number
            class="text-center w-full mx-2"
            :show-button="false"
            :value="powerUnit.consumption.highway"
            :on-update:value="inputHandler('consumption.highway', index)"
          >
            <template #prefix> {{ t("highway") }} </template>
            <template #suffix> {{ t("units.volume") }} </template>
          </n-input-number>
          <n-input-number
            class="text-center w-full mx-2"
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
      <div class="flex justify-end my-2">
        <n-button
          type="error"
          @click="deleteHandler(powerUnit)"
          :loading="isFetching"
          :disabled="isFetching"
        >
          <template #icon> <CloseSharp /> </template>
          {{ t("vehicle.powerUnits.delete") }}
        </n-button>
      </div>
    </n-collapse-item>
  </n-collapse>
</template>
<script>
export default {
  name: "PowerUnitsEditor",
};
</script>

<script setup>
import { defineProps, computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {
  NCollapse,
  NCollapseItem,
  NForm,
  NFormItem,
  NInputNumber,
  NSelect,
  NButton,
  useNotification,
} from "naive-ui";
import { CloseSharp } from "@vicons/ionicons5";
import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  DELETE_POWER_UNIT,
  SET_POWER_UNIT_OPTION,
} from "@/store/modules/carEditor/actionTypes";

const props = defineProps({
  complectation: Object,
  complectationIndex: Number,
});

const store = useStore();
const { t } = useI18n();
const notification = useNotification();

const isFetching = ref(false);

const engines = computed(() => store.state.carEditor.car.engines);
const transmissions = computed(() => store.state.carEditor.car.transmissions);

const engineOptions = engines.value.map((engine) => ({
  label: engine.displayName + ` ${engine.power} hp`,
  value: engine.id,
}));

const transmissionOptions = transmissions.value.map((transmission) => ({
  label: `${transmission.drive} - ${transmission?.gearbox?.numberOfGears} ${t(
    "vehicle.transmission.gearbox.types." + transmission?.gearbox?.type
  )}`,
  value: transmission.id,
}));

const getPowerUnitName = (powerUnit) => {
  const engine = engines.value.find((e) => e.id === powerUnit.engine);
  const transmission = transmissions.value.find(
    (t) => t.id === powerUnit.transmission
  );

  let title = "";

  if (engine && engine.displayName) title += engine.displayName + " ";

  if (transmission) {
    title += transmission.drive + " ";

    title += transmission.gearbox.numberOfGears + " ";

    title += t(
      "vehicle.transmission.gearbox.types." + transmission?.gearbox?.type
    );
  }
  return title;
};

const selectHandler = (field, powerUnitIndex) => (value) => {
  store.dispatch(carEditorNamespace(SET_POWER_UNIT_OPTION), [
    props.complectationIndex,
    powerUnitIndex,
    field,
    value,
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

const deleteHandler = async (powerUnit) => {
  try {
    isFetching.value = true;
    await store.dispatch(carEditorNamespace(DELETE_POWER_UNIT), [
      powerUnit,

      props.complectationIndex,
    ]);
    notification.success({
      title: t("notifications.success.title.default"),
      duration: 3000,
    });
  } catch (error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
      duration: 5000,
    });
  } finally {
    isFetching.value = false;
  }
};
</script>
