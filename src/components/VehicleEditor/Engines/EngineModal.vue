<template>
  <n-modal
    :show="isModalShowing"
    :on-update:show="closeModal"
    preset="card"
    :title="isEdit ? engine.displayName : t('vehicle.engine.addingNew')"
    :mask-closable="false"
    class="max-w-3xl"
  >
    <n-form class="grid md:grid-cols-2 gap-4">
      <n-form-item :label="t('vehicle.engine.displacement')">
        <n-input-number
          :value="engine.displacement"
          class="w-full"
          :show-button="false"
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
          :show-button="false"
          :on-update:value="inputHandler('pistons')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.engine.pistonsPlacement')">
        <n-select
          :value="engine.pistonsPlacement"
          :options="pistonsPlacement"
          :on-update:value="inputHandler('pistonsPlacement')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.engine.compressionRatio')">
        <n-input-number
          :value="engine.compressionRatio"
          class="w-full"
          :show-button="false"
          :on-update:value="inputHandler('compressionRatio')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.engine.power')">
        <n-input-number
          :value="engine.power"
          class="w-full"
          :show-button="false"
          :on-update:value="inputHandler('power')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.engine.rpm')">
        <n-input-group>
          <n-input-number
            :value="engine.powerRPMfrom"
            :show-button="false"
            :on-update:value="inputHandler('powerRPMfrom')"
          >
            <template #prefix>{{ t("from") }}:</template>
          </n-input-number>
          <n-input-number
            :value="engine.powerRPMto"
            :show-button="false"
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
          :show-button="false"
          :on-update:value="inputHandler('torque')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.engine.rpm')">
        <n-input-group>
          <n-input-number
            :value="engine.torqueRPMfrom"
            :show-button="false"
            :on-update:value="inputHandler('torqueRPMfrom')"
          >
            <template #prefix>{{ t("from") }}:</template>
          </n-input-number>
          <n-input-number
            :value="engine.torqueRPMto"
            :show-button="false"
            :on-update:value="inputHandler('torqueRPMto')"
          >
            <template #prefix>{{ t("to") }}:</template>
          </n-input-number>
        </n-input-group>
      </n-form-item>
      <div class="flex flex-col justify-center">
        <n-checkbox
          :checked="engine.turbo"
          :label="t('vehicle.engine.turbo')"
          class="py-1"
          :on-update:checked="inputHandler('turbo')"
        />
        <n-checkbox
          :checked="engine.hybrid"
          :label="t('vehicle.engine.hybrid')"
          class="py-1"
          :on-update:checked="inputHandler('hybrid')"
        />
      </div>
    </n-form>
    <template #action>
      <div class="text-right">
        <n-button v-if="isEdit" type="primary" @click="updateAction">
          {{ t("update") }}
        </n-button>
        <n-button v-else type="primary" @click="createAction">{{
          t("create")
        }}</n-button>
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
  try {
    await store.dispatch(carEditorNamespace(CREATE_NEW_ENGINE));
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
  }
};

const updateAction = async () => {
  try {
    await store.dispatch(carEditorNamespace(EDIT_ENGINE));
    notification.success({
      title: t("notifications.success.title.default"),
    });
  } catch (error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
    });
  }
};
</script>
