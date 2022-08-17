<template>
  <n-modal
    preset="card"
    :title="
      isEdit ? engineStore.engine.displayName : t('vehicle.engine.addingNew')
    "
    :mask-closable="false"
    class="max-w-4xl"
    :on-after-leave="onModalClose"
  >
    <n-scrollbar class="max-h-4/5 pr-2">
      <n-form class="grid md:grid-cols-2 gap-4 pr-3">
        <n-form-item :label="t('vehicle.engine.displacement')">
          <n-input-number
            v-model:value="engineStore.engine.displacement"
            class="w-full"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.injectionType')">
          <n-select
            v-model:value="engineStore.engine.injection"
            :options="injectionTypes"
          />
        </n-form-item>
        <n-form-item :label="t('tradename')">
          <n-select
            v-model:value="engineStore.engine.tradename"
            :options="tradenames"
            filterable
            tag
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.manufactureIndex')">
          <n-input v-model:value="engineStore.engine.manufactureIndex" />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.fuelType')">
          <n-select
            v-model:value="engineStore.engine.fuelType"
            :options="fuelTypes"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.pistonsQuantity')">
          <n-input-number
            v-model:value="engineStore.engine.pistons"
            class="w-full"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.numberOfValves')">
          <n-input-number
            v-model:value="engineStore.engine.numberOfValves"
            class="w-full"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.pistonsPlacement')">
          <n-select
            v-model:value="engineStore.engine.pistonsPlacement"
            :options="pistonsPlacement"
          />
        </n-form-item>

        <n-checkbox
          v-model:checked="engineStore.engine.cylinderShutOffSystem"
          :label="t('vehicle.engine.cylinderShutOffSystem')"
          class="mb-3"
        />

        <n-form-item :label="t('vehicle.engine.cylinderShutOffNumber')">
          <n-input-group>
            <n-input-number
              v-model:value="engineStore.engine.cylinderShutOffNumberFrom"
              class="w-full"
              :disabled="!engineStore.engine.cylinderShutOffSystem"
            >
              <template #prefix> {{ t("from") }}: </template>
            </n-input-number>
            <n-input-number
              v-model:value="engineStore.engine.cylinderShutOffNumberTo"
              class="w-full"
              :disabled="!engineStore.engine.cylinderShutOffSystem"
            >
              <template #prefix> {{ t("from") }}: </template>
            </n-input-number>
          </n-input-group>
        </n-form-item>

        <n-form-item :label="t('vehicle.engine.compressionRatio')">
          <n-input-number
            v-model:value="engineStore.engine.compressionRatio"
            class="w-full"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.power')">
          <n-input-number
            v-model:value="engineStore.engine.power"
            class="w-full"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.rpm')">
          <n-input-group>
            <n-input-number v-model:value="engineStore.engine.powerRPMfrom">
              <template #prefix> {{ t("from") }}: </template>
            </n-input-number>
            <n-input-number v-model:value="engineStore.engine.powerRPMto">
              <template #prefix> {{ t("to") }}: </template>
            </n-input-number>
          </n-input-group>
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.torque')">
          <n-input-number
            v-model:value="engineStore.engine.torque"
            class="w-full"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.rpm')">
          <n-input-group>
            <n-input-number v-model:value="engineStore.engine.torqueRPMfrom">
              <template #prefix> {{ t("from") }}: </template>
            </n-input-number>
            <n-input-number v-model:value="engineStore.engine.torqueRPMto">
              <template #prefix> {{ t("to") }}: </template>
            </n-input-number>
          </n-input-group>
        </n-form-item>

        <n-divider title-placement="left" class="md:col-span-2">
          <n-checkbox
            v-model:checked="engineStore.engine.isTurbo"
            :label="t('vehicle.engine.turbo')"
            class="py-1"
          />
        </n-divider>
        <template v-if="engineStore.engine.isTurbo && engineStore.engine.turbo">
          <n-form-item :label="t('vehicle.engine.turbineQuantity')">
            <n-input-number
              v-model:value="engineStore.engine.turbo.turboTurbineQuantity"
              class="w-full"
            />
          </n-form-item>
          <n-form-item :label="t('vehicle.engine.turboType')">
            <n-select
              v-model:value="engineStore.engine.turbo.turboType"
              :options="turboTypes"
            />
          </n-form-item>
        </template>

        <n-divider title-placement="left" class="md:col-span-2">
          <div class="flex flex-col gap-2">
            <n-checkbox
              v-model:checked="engineStore.engine.isSoftHybrid"
              :label="t('vehicle.engine.softHybrid')"
              class="py-1"
            />
            <n-checkbox
              v-model:checked="engineStore.engine.isHybrid"
              :label="t('vehicle.engine.hybrid')"
              class="py-1"
            />
            <n-checkbox
              v-model:checked="engineStore.engine.isElectric"
              :label="t('vehicle.engine.electric')"
              class="py-1"
            />
          </div>
        </n-divider>
        <template
          v-if="engineStore.engine.isHybrid && engineStore.engine.hybrid"
        >
          <n-form-item :label="t('vehicle.engine.hybridElectricPower')">
            <n-input-number
              v-model:value="engineStore.engine.hybrid.hybridElectricPower"
              class="w-full"
            />
          </n-form-item>
          <n-form-item :label="t('vehicle.engine.hybridElectricTorque')">
            <n-input-number
              v-model:value="engineStore.engine.hybrid.hybridElectricTorque"
              class="w-full"
            />
          </n-form-item>
          <n-form-item :label="t('vehicle.engine.hybridTotalPower')">
            <n-input-number
              v-model:value="engineStore.engine.hybrid.hybridTotalPower"
              class="w-full"
            />
          </n-form-item>
          <n-checkbox
            v-model:checked="engineStore.engine.hybrid.hybridRechargeable"
            :label="t('vehicle.engine.hybridRechargeable')"
            class="py-1"
          />
        </template>

        <template
          v-if="
            (engineStore.engine.isHybrid || engineStore.engine.isElectric) &&
            engineStore.engine.electric
          "
        >
          <n-form-item :label="t('vehicle.engine.electricBatteryCapacity')">
            <n-input-number
              v-model:value="
                engineStore.engine.electric.electricBatteryCapacity
              "
              class="w-full"
            />
          </n-form-item>

          <n-form-item :label="t('vehicle.engine.electricDistanceReserve')">
            <n-input-number
              v-model:value="
                engineStore.engine.electric.electricDistanceReserve
              "
              class="w-full"
            />
          </n-form-item>

          <n-form-item :label="t('vehicle.engine.electricBatteryType')">
            <n-input
              v-model:value="engineStore.engine.electric.electricBatteryType"
              class="w-full"
            />
          </n-form-item>

          <n-form-item :label="t('vehicle.engine.electricChargerType')">
            <n-input
              v-model:value="engineStore.engine.electric.electricChargerType"
              class="w-full"
            />
          </n-form-item>

          <n-form-item
            :label="t('vehicle.engine.electricRegularChargerChargeTime')"
          >
            <n-input-number
              v-model:value="
                engineStore.engine.electric.electricRegularChargerChargeTime
              "
              class="w-full"
            />
          </n-form-item>

          <n-form-item
            :label="t('vehicle.engine.electricSuperChargerChargeTime')"
          >
            <n-input-number
              v-model:value="
                engineStore.engine.electric.electricSuperChargerChargeTime
              "
              class="w-full"
            />
          </n-form-item>

          <n-form-item :label="t('vehicle.engine.electricEnginesQuantity')">
            <n-input-number
              v-model:value="
                engineStore.engine.electric.electricEnginesQuantity
              "
              class="w-full"
            />
          </n-form-item>

          <n-form-item :label="t('vehicle.engine.electricEnginesPLacement')">
            <n-input
              v-model:value="
                engineStore.engine.electric.electricEnginesPLacement
              "
              class="w-full"
            />
          </n-form-item>
        </template>
      </n-form>
    </n-scrollbar>

    <template #action>
      <div class="text-right">
        <n-button
          v-if="isEdit"
          type="primary"
          :disabled="isFetching"
          :loading="isFetching"
          @click="updateAction"
        >
          {{ t("update") }}
        </n-button>
        <n-button
          v-else
          type="primary"
          :disabled="isFetching"
          :loading="isFetching"
          @click="createAction"
        >
          {{ t("create") }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EngineModal",
});
</script>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {
  NModal,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NInputNumber,
  NCheckbox,
  NButton,
  NInputGroup,
  NScrollbar,
  NDivider,
  useNotification,
} from "naive-ui";
import apiClient from "@/helpers/apiClient";
import i18n from "@/i18n";
import { useEngineStore } from "@/stores/vehicleEditor/engine.store";

interface IProps {
  isEdit: boolean;
}

withDefaults(defineProps<IProps>(), {
  isEdit: false,
});

const emit = defineEmits(["update:show"]);

const vehicleWordings = i18n.ua.vehicle;

const engineStore = useEngineStore();
const { t } = useI18n();
const notification = useNotification();

const tradenames = ref([]);
const isFetching = ref(false);

onMounted(async () => {
  const res = await apiClient.get("/engines/tradenames");

  tradenames.value = res.map((item) => ({ value: item, label: item }));
});

const injectionTypes = Object.keys(vehicleWordings.engine.injectionTypes).map(
  (type) => ({
    value: type,
    label: t(`vehicle.engine.injectionTypes.${type}`),
  })
);

const fuelTypes = Object.keys(vehicleWordings.engine.fuelTypes).map((type) => ({
  value: type,
  label: t(`vehicle.engine.fuelTypes.${type}`),
}));

const turboTypes = Object.keys(vehicleWordings.engine.turboTypes).map(
  (turbo) => ({
    value: turbo,
    label: t(`vehicle.engine.turboTypes.${turbo}`),
  })
);

const pistonsPlacement = Object.keys(
  vehicleWordings.engine.pistonsPlacements
).map((placement) => ({
  value: placement,
  label: t(`vehicle.engine.pistonsPlacements.${placement}`),
}));

const createAction = async () => {
  await saveHelper(engineStore.createNewEngine);
};

const updateAction = async () => {
  await saveHelper(engineStore.updateEngine);
};

const saveHelper = async (action: () => Promise<void>) => {
  try {
    isFetching.value = true;
    await action();
    notification.success({
      title: t("notifications.success.title.default"),
      duration: 3000,
    });
    emit("update:show", false);
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

const onModalClose = () => {
  engineStore.$reset();
};
</script>
