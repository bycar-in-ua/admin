<template>
  <n-modal
    :show="isModalShowing"
    :on-update:show="closeModal"
    preset="card"
    :title="
      isEdit ? transmission.displayName : t('vehicle.transmission.addingNew')
    "
    :mask-closable="false"
    class="max-w-4xl"
  >
    <n-form class="grid md:grid-cols-2 gap-4">
      <n-form-item :label="t('vehicle.transmission.drive')">
        <n-select
          :value="transmission.drive"
          :options="driveTypesOptions"
          :on-update:value="inputHandler('drive')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.driveName')">
        <n-input
          :value="transmission.driveName"
          :on-update:value="inputHandler('driveName')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.suspensionTypeFront')">
        <n-input-group>
          <n-select
            :value="transmission.suspensionTypeFront"
            :options="suspensionTypesOptions"
            :on-update:value="inputHandler('suspensionTypeFront')"
          />
          <n-select
            :value="transmission.suspensionWorkItemFront"
            :options="workItemsOptions"
            :on-update:value="inputHandler('suspensionWorkItemFront')"
          />
        </n-input-group>
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.suspensionTypeRear')">
        <n-input-group>
          <n-select
            :value="transmission.suspensionTypeRear"
            :options="suspensionTypesOptions"
            :on-update:value="inputHandler('suspensionTypeRear')"
          />
          <n-select
            :value="transmission.suspensionWorkItemRear"
            :options="workItemsOptions"
            :on-update:value="inputHandler('suspensionWorkItemRear')"
          />
        </n-input-group>
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.brakingSystemTypeFront')">
        <n-select
          :value="transmission.brakingSystemTypeFront"
          :options="breakingSystemOptions"
          :on-update:value="inputHandler('brakingSystemTypeFront')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.brakingSystemTypeRear')">
        <n-select
          :value="transmission.brakingSystemTypeRear"
          :options="breakingSystemOptions"
          :on-update:value="inputHandler('brakingSystemTypeRear')"
        />
      </n-form-item>

      <n-h4 class="md:col-span-2 mt-0">{{
        t("vehicle.transmission.gearbox.abbr")
      }}</n-h4>
      <n-form-item :label="t('vehicle.transmission.gearbox.type')">
        <n-select
          :value="transmission.gearbox.type"
          :options="gearboxTypesOptions"
          :on-update:value="inputHandler('gearbox.type')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.gearbox.numberOfGears')">
        <n-input-number
          :value="transmission.gearbox.numberOfGears"
          class="w-full"
          :show-button="false"
          :on-update:value="inputHandler('gearbox.numberOfGears')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.gearbox.technology')">
        <n-input
          :value="transmission.gearbox.technology"
          :on-update:value="inputHandler('gearbox.technology')"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.manufactureIndex')">
        <n-input
          :value="transmission.gearbox.manufactureIndex"
          :on-update:value="inputHandler('gearbox.manufactureIndex')"
        />
      </n-form-item>
      <n-form-item :label="t('manufacturer')">
        <n-input
          :value="transmission.gearbox.made"
          :on-update:value="inputHandler('gearbox.made')"
        />
      </n-form-item>
    </n-form>
    <template #action>
      <div class="text-right">
        <n-button v-if="isEdit" type="primary" @click="updateAction">
          {{ t("update") }}
        </n-button>
        <n-button v-else type="primary" @click="createAction">
          {{ t("create") }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {
  NModal,
  NForm,
  NFormItem,
  NInputGroup,
  NInput,
  NSelect,
  NInputNumber,
  NButton,
  NH4,
  useNotification,
} from "naive-ui";
import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  UPDATE_TRANSMISSION_FIELD,
  UPDATE_TRANSMISSION_MODAL_OPEN,
} from "@/store/modules/carEditor/transmission/mutationTypes";
import {
  CREATE_NEW_TRANSMISSION,
  EDIT_TRANSMISSION,
} from "@/store/modules/carEditor/transmission/actionTypes";
import { driveTypes, gearboxTypes } from "@/helpers/transmissionHelpers";
import { vehicleRU as vehicleWordings } from "@/i18n/vehicle";

const store = useStore();
const { t } = useI18n();
const notification = useNotification();

const driveTypesOptions = driveTypes.map((type) => ({
  label: t("vehicle.transmission.driveType." + type),
  value: type,
}));

const gearboxTypesOptions = gearboxTypes.map((type) => ({
  label: t("vehicle.transmission.gearbox." + type),
  value: type,
}));

const isModalShowing = computed(
  () => store.state.carEditor.transmission.isTransmissionModalOpen
);
const isEdit = computed(
  () => store.getters[carEditorNamespace("isTransmissionEdit")]
);

const createSelectOption = (item, translationPath) => ({
  value: item,
  label: t(translationPath + item),
});

const breakingSystemOptions = Object.keys(
  vehicleWordings.transmission.brakingSystemTypes
).map((item) =>
  createSelectOption(item, "vehicle.transmission.brakingSystemTypes.")
);

const suspensionTypesOptions = [
  {
    type: "group",
    label: t("vehicle.transmission.suspensions.types.independent.title"),
    key: "independent",
    children: Object.keys(
      vehicleWordings.transmission.suspensions.types.independent.items
    ).map((item) =>
      createSelectOption(
        item,
        "vehicle.transmission.suspensions.types.independent.items."
      )
    ),
  },
  {
    type: "group",
    label: t("vehicle.transmission.suspensions.types.dependent.title"),
    key: "dependent",
    children: Object.keys(
      vehicleWordings.transmission.suspensions.types.dependent.items
    ).map((item) =>
      createSelectOption(
        item,
        "vehicle.transmission.suspensions.types.dependent.items."
      )
    ),
  },
];

const workItemsOptions = Object.keys(
  vehicleWordings.transmission.suspensions.workItems
).map((item) =>
  createSelectOption(item, "vehicle.transmission.suspensions.workItems.")
);

const closeModal = (val) => {
  store.commit(carEditorNamespace(UPDATE_TRANSMISSION_MODAL_OPEN), val);
};

const transmission = computed(
  () => store.state.carEditor.transmission.transmission
);

const inputHandler = (field) => (val) => {
  store.commit(carEditorNamespace(UPDATE_TRANSMISSION_FIELD), [field, val]);
};

const createAction = async () => {
  try {
    await store.dispatch(carEditorNamespace(CREATE_NEW_TRANSMISSION));
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
    await store.dispatch(carEditorNamespace(EDIT_TRANSMISSION));
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
</script>
