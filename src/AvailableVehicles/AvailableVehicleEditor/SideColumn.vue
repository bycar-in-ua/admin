<script setup lang="ts">
import { inject } from "vue";
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

const { t } = useI18n();
const notification = useNotification();
const availalbeVehicleEditorStore = useAvailableVehicleEditorStore();

const saveHandler = inject<() => void>("saveAvailableVehicle");

async function removeHandler() {
  await availalbeVehicleEditorStore.removeAvailableVehicle();

  notification.warning({
    title: "Автомобіль видалено успішно",
    duration: 3000,
  });
}

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
      v-model:value="
        availalbeVehicleEditorStore.availableVehicleEditorState.status
      "
      :options="statusOptions"
    />
  </NFormItem>

  <NFormItem label="Дилер">
    <NSelect
      v-model:value="
        availalbeVehicleEditorStore.availableVehicleEditorState.dealerId
      "
      value-field="id"
      label-field="name"
      :options="[availalbeVehicleEditorStore.car?.dealer].filter(Boolean)"
      disabled
    />
  </NFormItem>

  <NFormItem :label="t('price') + ' (грн)'">
    <NInputNumber
      v-model:value="
        availalbeVehicleEditorStore.availableVehicleEditorState.price
      "
      class="w-full"
    />
  </NFormItem>
</template>
