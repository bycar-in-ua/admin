<template>
  <n-modal
    :show="isModalShowing"
    :on-update:show="closeModal"
    preset="card"
    :title="isEdit ? engine.displayName : t('vehicle.engine.addingNew')"
    :mask-closable="false"
    class="max-w-3xl"
  >
    <n-scrollbar style="max-height: 75vh">
      <n-form class="grid md:grid-cols-2 gap-4 pr-3">
        <n-form-item :label="t('vehicle.engine.displacement')">
          <n-input-number
            :value="engine.displacement"
            class="w-full"
            :on-update:value="inputHandler('displacement')"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.injectionType')">
          <n-select
            :value="engine.injection"
            :options="injectionTypes"
            :on-update:value="inputHandler('injection')"
          />
        </n-form-item>
        <n-form-item :label="t('tradename')">
          <n-select
            :value="engine.tradename"
            :options="tradenames"
            :on-update:value="inputHandler('tradename')"
            filterable
            tag
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.manufactureIndex')">
          <n-input :on-update:value="inputHandler('manufactureIndex')" />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.fuelType')">
          <n-select
            :value="engine.fuelType"
            :options="fuelTypes"
            :on-update:value="inputHandler('fuelType')"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.pistonsQuantity')">
          <n-input-number
            :value="engine.pistons"
            class="w-full"
            :on-update:value="inputHandler('pistons')"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.numberOfValves')">
          <n-input-number
            :value="engine.numberOfValves"
            class="w-full"
            :on-update:value="inputHandler('numberOfValves')"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.pistonsPlacement')">
          <n-select
            :value="engine.pistonsPlacement"
            :options="pistonsPlacement"
            :on-update:value="inputHandler('pistonsPlacement')"
          />
        </n-form-item>
        <div>
          <n-checkbox
            :checked="engine.cylinderShutOffSystem"
            :label="t('vehicle.engine.cylinderShutOffSystem')"
            :on-update:checked="inputHandler('cylinderShutOffSystem')"
            class="mb-3"
          />
          <n-form-item :label="t('vehicle.engine.cylinderShutOffNumber')">
            <n-input-group>
              <n-input-number
                :value="engine.cylinderShutOffNumberFrom"
                class="w-full"
                :on-update:value="inputHandler('cylinderShutOffNumberFrom')"
                :disabled="!engine.cylinderShutOffSystem"
              >
                <template #prefix>{{ t("from") }}:</template>
              </n-input-number>
              <n-input-number
                :value="engine.cylinderShutOffNumberTo"
                class="w-full"
                :on-update:value="inputHandler('cylinderShutOffNumberTo')"
                :disabled="!engine.cylinderShutOffSystem"
              >
                <template #prefix>{{ t("from") }}:</template>
              </n-input-number>
            </n-input-group>
          </n-form-item>
        </div>
        <n-form-item :label="t('vehicle.engine.compressionRatio')">
          <n-input-number
            :value="engine.compressionRatio"
            class="w-full"
            :on-update:value="inputHandler('compressionRatio')"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.power')">
          <n-input-number
            :value="engine.power"
            class="w-full"
            :on-update:value="inputHandler('power')"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.rpm')">
          <n-input-group>
            <n-input-number
              :value="engine.powerRPMfrom"
              :on-update:value="inputHandler('powerRPMfrom')"
            >
              <template #prefix>{{ t("from") }}:</template>
            </n-input-number>
            <n-input-number
              :value="engine.powerRPMto"
              :on-update:value="inputHandler('powerRPMto')"
            >
              <template #prefix>{{ t("to") }}:</template>
            </n-input-number>
          </n-input-group>
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.torque')">
          <n-input-number
            :value="engine.torque"
            class="w-full"
            :on-update:value="inputHandler('torque')"
          />
        </n-form-item>
        <n-form-item :label="t('vehicle.engine.rpm')">
          <n-input-group>
            <n-input-number
              :value="engine.torqueRPMfrom"
              :on-update:value="inputHandler('torqueRPMfrom')"
            >
              <template #prefix>{{ t("from") }}:</template>
            </n-input-number>
            <n-input-number
              :value="engine.torqueRPMto"
              :on-update:value="inputHandler('torqueRPMto')"
            >
              <template #prefix>{{ t("to") }}:</template>
            </n-input-number>
          </n-input-group>
        </n-form-item>
        <div class="flex flex-col justify-center">
          <n-checkbox
            :checked="engine.softHybrid"
            :label="t('vehicle.engine.softHybrid')"
            class="py-1"
            :on-update:checked="inputHandler('softHybrid')"
          />
        </div>
        <n-divider title-placement="left" class="md:col-span-2">
          <n-checkbox
            :checked="engine.turbo"
            :label="t('vehicle.engine.turbo')"
            class="py-1"
            :on-update:checked="inputHandler('turbo')"
          />
        </n-divider>
        <div
          v-if="engine.turbo"
          class="grid md:grid-cols-2 gap-4 md:col-span-2"
        >
          <n-form-item :label="t('vehicle.engine.turbineQuantity')">
            <n-input-number
              :value="engine.turbineQuantity"
              class="w-full"
              :on-update:value="inputHandler('turbineQuantity')"
            />
          </n-form-item>
          <n-form-item :label="t('vehicle.engine.turboType')">
            <n-select
              :value="engine.turboType"
              :options="turboTypes"
              :on-update:value="inputHandler('turboType')"
            />
          </n-form-item>
        </div>
        <n-divider title-placement="left" class="md:col-span-2">
          <n-checkbox
            :checked="engine.hybrid"
            :label="t('vehicle.engine.hybrid')"
            class="py-1"
            :on-update:checked="inputHandler('hybrid')"
          />
        </n-divider>
        <div
          v-if="engine.hybrid"
          class="grid md:grid-cols-2 gap-4 md:col-span-2"
        >
          <n-form-item :label="t('vehicle.engine.electricPower')">
            <n-input-number
              :value="engine.electricPower"
              class="w-full"
              :on-update:value="inputHandler('electricPower')"
            />
          </n-form-item>
          <n-form-item :label="t('vehicle.engine.electricTorque')">
            <n-input-number
              :value="engine.electricTorque"
              class="w-full"
              :on-update:value="inputHandler('electricTorque')"
            />
          </n-form-item>
          <n-form-item :label="t('vehicle.engine.electricDistanceReserve')">
            <n-input-number
              :value="engine.electricDistanceReserve"
              class="w-full"
              :on-update:value="inputHandler('electricDistanceReserve')"
            />
          </n-form-item>
          <n-form-item :label="t('vehicle.engine.electricBatteryReserve')">
            <n-input-number
              :value="engine.electricBatteryReserve"
              class="w-full"
              :on-update:value="inputHandler('electricBatteryReserve')"
            />
          </n-form-item>
          <n-form-item :label="t('vehicle.engine.hybridTotalPower')">
            <n-input-number
              :value="engine.hybridTotalPower"
              class="w-full"
              :on-update:value="inputHandler('hybridTotalPower')"
            />
          </n-form-item>
          <n-checkbox
            :checked="engine.hybridRechargeable"
            :label="t('vehicle.engine.hybridRechargeable')"
            class="py-1"
            :on-update:checked="inputHandler('hybridRechargeable')"
          />
        </div>
      </n-form>
    </n-scrollbar>

    <template #action>
      <div class="text-right">
        <n-button
          v-if="isEdit"
          type="primary"
          @click="updateAction"
          :disabled="isFetching"
          :loading="isFetching"
        >
          {{ t("update") }}
        </n-button>
        <n-button
          v-else
          type="primary"
          @click="createAction"
          :disabled="isFetching"
          :loading="isFetching"
        >
          {{ t("create") }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
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
import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  UPDATE_ENGINE_FIELD,
  UPDATE_ENGINE_MODAL_OPEN,
} from "@/store/modules/carEditor/engine/mutationTypes";
import {
  CREATE_NEW_ENGINE,
  EDIT_ENGINE,
} from "@/store/modules/carEditor/engine/actionTypes";
import apiClient from "@/helpers/apiClient";
import { vehicleRU as vehicleWordings } from "@/i18n/vehicle";

const store = useStore();
const { t } = useI18n();
const notification = useNotification();

const tradenames = ref([]);
const isFetching = ref(false);

onMounted(async () => {
  const res = await apiClient.get("/engines/tradenames");

  tradenames.value = res.map((item) => ({ value: item, label: item }));
});

const isModalShowing = computed(
  () => store.state.carEditor.engine.isEngineModalOpen
);
const isEdit = computed(
  () => store.getters[carEditorNamespace("isEngineEdit")]
);

const closeModal = (val) => {
  store.commit(carEditorNamespace(UPDATE_ENGINE_MODAL_OPEN), val);
};

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

const turboTypes = ["Twin Turbo", "Biturbo"].map((t) => ({
  value: t,
  label: t,
}));

const pistonsPlacement = Object.keys(
  vehicleWordings.engine.pistonsPlacements
).map((placement) => ({
  value: placement,
  label: t(`vehicle.engine.pistonsPlacements.${placement}`),
}));

const engine = computed(() => store.state.carEditor.engine.engine);

const inputHandler = (field) => (val) => {
  store.commit(carEditorNamespace(UPDATE_ENGINE_FIELD), [field, val]);
};

const createAction = async () => {
  await saveHelper(CREATE_NEW_ENGINE);
};

const updateAction = async () => {
  await saveHelper(EDIT_ENGINE);
};

const saveHelper = async (action) => {
  try {
    isFetching.value = true;
    await store.dispatch(carEditorNamespace(action));
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
