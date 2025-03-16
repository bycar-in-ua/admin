<script setup lang="ts">
import { computed, inject } from "vue";
import { PostStatus } from "@bycar-in-ua/sdk";
import { useAvailableVehicleEditorStore } from "@/stores/availableVehicleEditor.store";
import {
  NFormItem,
  NSelect,
  NInputNumber,
  NButton,
  NPopconfirm,
  useNotification,
} from "naive-ui";
import { useI18n } from "vue-i18n";
import {
  H1Input,
  MetaTitleInput,
  MetaDescriptionInput,
} from "@/components/SeoInputs";
import { getPowerUnitName } from "../useAddAvailableVehicle";
import { saveAvailableVehicleHandlerKey } from "../keys";

const { t } = useI18n();
const notification = useNotification();
const availalbeVehicleEditorStore = useAvailableVehicleEditorStore();

const saveHandler = inject(saveAvailableVehicleHandlerKey);

async function removeHandler() {
  await availalbeVehicleEditorStore.removeAvailableVehicle();

  notification.warning({
    title: "Автомобіль видалено успішно",
    duration: 3000,
  });
}

const activeComplecttaion = computed(() =>
  availalbeVehicleEditorStore.car?.vehicle?.complectations.find(
    (cmpl) => cmpl.id === availalbeVehicleEditorStore.editor.complectationId
  )
);

const powerUnits = computed(() => {
  if (!activeComplecttaion.value) {
    return [];
  }

  return activeComplecttaion.value.powerUnits.map((pu) => ({
    value: pu.id,
    label: getPowerUnitName(pu, t),
  }));
});

const statusOptions = Object.values(PostStatus).map((status) => ({
  value: status,
  label: t("vehicle.status." + status),
}));
</script>

<template>
  <div class="flex gap-4 justify-end mb-4">
    <NPopconfirm
      :positive-text="t('delete')"
      :negative-text="t('discard')"
      :loading="availalbeVehicleEditorStore.removePending"
      @positive-click="removeHandler"
    >
      <template #trigger>
        <NButton
          type="error"
          ghost
          :loading="availalbeVehicleEditorStore.removePending"
        >
          {{ t("delete") }}
        </NButton>
      </template>
      <div class="max-w-96">
        Ви впевнені, що хочете видалити авто в наявності?
      </div>
    </NPopconfirm>

    <NButton
      type="primary"
      :loading="availalbeVehicleEditorStore.savingPending"
      @click="saveHandler"
    >
      {{ t("save") }}
    </NButton>
  </div>

  <NFormItem :label="t('status')">
    <NSelect
      v-model:value="availalbeVehicleEditorStore.editor.status"
      :options="statusOptions"
    />
  </NFormItem>

  <NFormItem label="Дилер">
    <NSelect
      v-model:value="availalbeVehicleEditorStore.editor.dealerId"
      value-field="id"
      label-field="name"
      :options="[availalbeVehicleEditorStore.car?.dealer].filter(Boolean)"
      disabled
    />
  </NFormItem>

  <NFormItem label="Комплектація">
    <NSelect
      v-model:value="availalbeVehicleEditorStore.editor.complectationId"
      value-field="id"
      label-field="displayName"
      :options="availalbeVehicleEditorStore.car?.vehicle?.complectations"
    />
  </NFormItem>

  <NFormItem label="Силова установка">
    <NSelect
      v-model:value="availalbeVehicleEditorStore.editor.powerUnitId"
      :options="powerUnits"
    />
  </NFormItem>

  <NFormItem :label="t('price') + ' (грн)'">
    <NInputNumber
      v-model:value="availalbeVehicleEditorStore.editor.price"
      class="w-full"
    />
  </NFormItem>

  <NFormItem label="Пробіг" show-feedback feedback-class="mb-4">
    <NInputNumber
      v-model:value="availalbeVehicleEditorStore.editor.mileage"
      class="w-full"
    />

    <template #feedback> Якщо авто з трейд-ін, вкажіть пробіг авто </template>
  </NFormItem>

  <H1Input v-model="availalbeVehicleEditorStore.editor.h1" />

  <MetaTitleInput v-model="availalbeVehicleEditorStore.editor.metaTitle" />

  <MetaDescriptionInput
    v-model="availalbeVehicleEditorStore.editor.metaDescription"
  />
</template>
