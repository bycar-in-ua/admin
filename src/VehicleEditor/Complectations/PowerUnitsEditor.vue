<script setup lang="ts">
import { ref } from "vue";
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
import type { PowerUnit } from "@bycar-in-ua/sdk";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useComplectationStore } from "@/stores/vehicleEditor/complectation.store";
import { getTransmissionDisplayName } from "@/helpers/transmission.helpers";
import { getEngineLabel } from "@/helpers/engine.helpers";

defineOptions({
  name: "PowerUnitsEditor",
});

interface IProps {
  powerUnits: PowerUnit[];
}

defineProps<IProps>();

const vehicleStore = useVehicleStore();
const complectationStore = useComplectationStore();
const { t } = useI18n();
const notification = useNotification();

const expandedNames = ref(null);
const isFetching = ref(false);

const getPowerUnitName = (powerUnit: PowerUnit) => {
  const engine = vehicleStore.enginesMapById.get(powerUnit.engineId);
  const transmission = vehicleStore.transmissionsMapById.get(
    powerUnit.transmissionId
  );

  const title = [getEngineLabel(engine)];

  if (transmission) {
    title.push(getTransmissionDisplayName(transmission, t));
  }

  return title.join(" ");
};

const deleteHandler = async (powerUnit) => {
  try {
    isFetching.value = true;
    await complectationStore.deletePowerUnit(powerUnit);
    notification.success({
      title: t("notifications.powerUnit.deleting.success"),
      duration: 3000,
    });
  } catch (e) {
    const error = e as Error;

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

<template>
  <n-collapse v-model:expanded-names="expandedNames" accordion>
    <n-collapse-item
      v-for="(powerUnit, index) in powerUnits"
      :key="powerUnit.id"
      :title="getPowerUnitName(powerUnit)"
      :name="powerUnit.id"
    >
      <n-form class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <n-form-item :label="t('vehicle.engine.title')">
          <n-select
            v-model:value="complectationStore.complectation.powerUnits[index].engineId"
            :options="vehicleStore.enginesOptions"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.powerUnits.transmission')">
          <n-select
            v-model:value="complectationStore.complectation.powerUnits[index].transmissionId"
            :options="vehicleStore.transmissionsOptions(t)"
          />
        </n-form-item>
        <n-form-item :label="t('price')">
          <n-input-number
            v-model:value="complectationStore.complectation.powerUnits[index].price"
            class="w-full"
            :show-button="false"
          >
            <template #prefix> $ </template>
          </n-input-number>
        </n-form-item>

        <n-form-item
          :label="t('vehicle.powerUnits.consumption')"
          class="col-span-2 md:col-span-3 -mx-2"
        >
          <n-input-number
            v-model:value="
              complectationStore.complectation.powerUnits[index].consumption.city
            "
            class="text-center w-full mx-2"
            :show-button="false"
          >
            <template #prefix>
              {{ t("city") }}
            </template>
            <template #suffix>
              {{ t("units.volume") }}
            </template>
          </n-input-number>
          <n-input-number
            v-model:value="
              complectationStore.complectation.powerUnits[index].consumption.highway
            "
            class="text-center w-full mx-2"
            :show-button="false"
          >
            <template #prefix>
              {{ t("highway") }}
            </template>
            <template #suffix>
              {{ t("units.volume") }}
            </template>
          </n-input-number>
          <n-input-number
            v-model:value="
              complectationStore.complectation.powerUnits[index].consumption.mixed
            "
            class="text-center w-full mx-2"
            :show-button="false"
          >
            <template #prefix>
              {{ t("mixed") }}
            </template>
            <template #suffix>
              {{ t("units.volume") }}
            </template>
          </n-input-number>
        </n-form-item>

        <n-form-item :label="t('vehicle.powerUnits.speedUp100')">
          <n-input-number
            v-model:value="complectationStore.complectation.powerUnits[index].speedUp100"
            class="w-full"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.powerUnits.maxSpeed')">
          <n-input-number
            v-model:value="complectationStore.complectation.powerUnits[index].maxSpeed"
            class="w-full"
          />
        </n-form-item>
      </n-form>
      <div class="flex justify-end my-2">
        <n-button
          type="error"
          :loading="isFetching"
          :disabled="isFetching"
          @click="deleteHandler(powerUnit)"
        >
          <template #icon>
            <CloseSharp />
          </template>
          {{ t("vehicle.powerUnits.delete") }}
        </n-button>
      </div>
    </n-collapse-item>
  </n-collapse>
</template>
