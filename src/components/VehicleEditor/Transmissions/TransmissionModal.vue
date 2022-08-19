х
<template>
  <n-modal
    :on-update:show="(val) => $emit('update:show', val)"
    :on-after-leave="onModalClose"
    preset="card"
    :title="
      isEdit
        ? getTransmissionDisplayName(transmission.$state, t)
        : t('vehicle.transmission.addingNew')
    "
    :mask-closable="false"
    class="max-w-4xl"
  >
    <n-form class="grid md:grid-cols-2 gap-4">
      <n-form-item :label="t('vehicle.transmission.drive')">
        <n-select
          v-model:value="transmission.drive"
          :options="driveTypesOptions"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.driveName')">
        <n-input v-model:value="transmission.driveName" />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.suspensionTypeFront')">
        <n-input-group>
          <n-select
            v-model:value="transmission.suspensionTypeFront"
            :options="suspensionTypesOptions"
          />
          <n-select
            v-model:value="transmission.suspensionWorkItemFront"
            :options="workItemsOptions"
          />
        </n-input-group>
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.suspensionTypeRear')">
        <n-input-group>
          <n-select
            v-model:value="transmission.suspensionTypeRear"
            :options="suspensionTypesOptions"
          />
          <n-select
            v-model:value="transmission.suspensionWorkItemRear"
            :options="workItemsOptions"
          />
        </n-input-group>
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.brakingSystemTypeFront')">
        <n-select
          v-model:value="transmission.brakingSystemTypeFront"
          :options="breakingSystemOptions"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.brakingSystemTypeRear')">
        <n-select
          v-model:value="transmission.brakingSystemTypeRear"
          :options="breakingSystemOptions"
        />
      </n-form-item>

      <n-h4 class="md:col-span-2 mt-0">
        {{ t("vehicle.transmission.gearbox.abbr") }}
      </n-h4>
      <n-form-item :label="t('vehicle.transmission.gearbox.type')">
        <n-select
          v-model:value="transmission.gearbox.type"
          :options="gearboxTypesOptions"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.gearbox.subType')">
        <n-select
          v-model:value="transmission.gearbox.subType"
          :options="gearboxSubTypesOptions"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.gearbox.numberOfGears')">
        <n-input-number
          v-model:value="transmission.gearbox.numberOfGears"
          class="w-full"
          :show-button="false"
        />
      </n-form-item>
      <n-form-item :label="t('vehicle.transmission.gearbox.technology')">
        <n-input v-model:value="transmission.gearbox.technology" />
      </n-form-item>
      <n-form-item :label="t('vehicle.manufactureIndex')">
        <n-input v-model:value="transmission.gearbox.manufactureIndex" />
      </n-form-item>
      <n-form-item :label="t('manufacturer')">
        <n-input v-model:value="transmission.gearbox.made" />
      </n-form-item>
    </n-form>
    <template #action>
      <div class="text-right">
        <n-button
          v-if="isEdit"
          type="primary"
          :loading="isFetching"
          @click="updateAction"
        >
          {{ t("update") }}
        </n-button>
        <n-button
          v-else
          type="primary"
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
  name: "TransmissionModal",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
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
import i18n from "@/i18n";
import { useTransmissionStore } from "@/stores/vehicleEditor/transmission.store";
import { getTransmissionDisplayName } from "@/helpers/transmission.helper";

defineProps<{ isEdit: boolean }>();

const emit = defineEmits(["update:show"]);

const vehicleWordings = i18n.ua.vehicle;

const transmission = useTransmissionStore();
const { t } = useI18n();
const notification = useNotification();

const isFetching = ref(false);

const driveTypesOptions = Object.keys(
  vehicleWordings.transmission.driveType
).map((type) => ({
  label: t("vehicle.transmission.driveType." + type),
  value: type,
}));

const gearboxTypesOptions = Object.keys(
  vehicleWordings.transmission.gearbox.types
).map((type) => ({
  label: t("vehicle.transmission.gearbox.types." + type),
  value: type,
}));

const gearboxSubTypesOptions = Object.keys(
  vehicleWordings.transmission.gearbox.subTypes
).map((type) => ({
  label: t("vehicle.transmission.gearbox.subTypes." + type),
  value: type,
}));

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

const createAction = async () => {
  try {
    isFetching.value = true;
    await transmission.createNewTransmission();
    notification.success({
      title: t("notifications.success.title.default"),
      duration: 3000,
    });
    emit("update:show", false);
  } catch (error: Error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: error.message,
      duration: 5000,
    });
  } finally {
    isFetching.value = false;
  }
};

const updateAction = async () => {
  try {
    isFetching.value = true;
    await transmission.updateTransmission();
    notification.success({
      title: t("notifications.success.title.default"),
      duration: 3000,
    });
    emit("update:show", false);
  } catch (error: Error) {
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
  transmission.$reset();
};
</script>
