<template>
  <n-collapse accordion v-model:expanded-names="expandedNames">
    <n-collapse-item
      v-for="(powerUnit, index) in powerUnits"
      :key="powerUnit.id"
      :title="getPowerUnitName(powerUnit)"
      :name="powerUnit.id"
    >
      <n-form class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <n-form-item :label="t('vehicle.engine.title')">
          <n-select
            :options="engineOptions"
            :value="powerUnit.engineId"
            :on-update:value="selectHandler('engineId', index)"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.powerUnits.transmission')">
          <n-select
            :options="transmissionOptions"
            :value="powerUnit.transmissionId"
            :on-update:value="selectHandler('transmissionId', index)"
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
  data: () => ({
    expandedNames: null,
  }),
  props: {
    powerUnits: {
      type: Array,
      requierd: true,
    },
  },
};
</script>

<script setup>
import { computed, ref } from "vue";
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
  SET_POWER_UNIT_OPTION,
  DELETE_POWER_UNIT,
} from "@/store/modules/carEditor/complectation/actionTypes";

const store = useStore();
const { t } = useI18n();
const notification = useNotification();

const isFetching = ref(false);

const enginesMapById = computed(
  () => store.getters[carEditorNamespace("enginesMapById")]
);
const transmissionsMapById = computed(
  () => store.getters[carEditorNamespace("transmissionsMapById")]
);

const engineOptions = computed(
  () => store.getters[carEditorNamespace("getEnginesOptions")]
);

const transmissionOptions = computed(() =>
  store.getters[carEditorNamespace("getTransmissionsOptions")](t)
);

const getPowerUnitName = (powerUnit) => {
  const engine = enginesMapById.value.get(powerUnit.engineId);
  const transmission = transmissionsMapById.value.get(powerUnit.transmissionId);

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
    powerUnitIndex,
    field,
    value,
  ]);
};

const inputHandler = (field, powerUnitIndex) => (value) => {
  store.dispatch(carEditorNamespace(SET_POWER_UNIT_OPTION), [
    powerUnitIndex,
    field,
    value,
  ]);
};

const deleteHandler = async (powerUnit) => {
  try {
    isFetching.value = true;
    await store.dispatch(carEditorNamespace(DELETE_POWER_UNIT), powerUnit);
    notification.success({
      title: t("notifications.powerUnit.deleting.success"),
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
