<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NCard, NPopconfirm, NInput, NButton, useNotification } from "naive-ui";
import ComplectationModal from "./ComplectationModal.vue";
import PlusButton from "@/components/common/PlusButton.vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useComplectationStore } from "@/stores/vehicleEditor/complectation.store";
import type { Complectation } from "@bycar-in-ua/sdk";

const vehicleStore = useVehicleStore();
const complectationStore = useComplectationStore();
const { t } = useI18n();
const notification = useNotification();

const newComplectationName = ref("");
const showModal = ref(false);
const isDeleting = ref(false);

const openEditModal = (complectation: Complectation) => {
  complectationStore.complectation = {
    ...complectation,
  };
  showModal.value = true;
};

const createComplectation = async () => {
  await vehicleStore.createComplectation(newComplectationName.value);

  newComplectationName.value = "";
};

const deleteComplectation = async (cmplId) => {
  try {
    isDeleting.value = true;
    await vehicleStore.deleteComplectation(cmplId);
    notification.success({
      title: t("notifications.complectation.deleting.success"),
      duration: 5000,
    });
  } catch (error) {
    notification.error({
      title: t("notifications.error.title.default"),
      description: (error as Error).message,
      duration: 5000,
    });
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <n-card :title="t('complectations.title')" size="small" class="my-4 shadow">
    <div class="editors-cards-grid">
      <n-card
        v-for="complectation in vehicleStore.car.complectations"
        :key="complectation.id"
        :title="complectation.displayName"
        size="small"
      >
        <template #action>
          <div class="flex flex-wrap justify-between">
            <n-button
              type="error"
              quaternary
              :disabled="isDeleting"
              @click="deleteComplectation(complectation.id)"
            >
              {{ t("delete") }}
            </n-button>

            <n-button quaternary @click="openEditModal(complectation)">
              {{ t("edit") }}
            </n-button>
          </div>
        </template>
      </n-card>

      <n-popconfirm
        :show-icon="false"
        :positive-text="t('complectations.addNew')"
        :negative-text="t('discard')"
        @positive-click="createComplectation"
      >
        <template #trigger>
          <plus-button
            :callback="() => ({})"
            :title="t('complectations.addNew')"
          />
        </template>

        <n-input
          v-model:value="newComplectationName"
          type="text"
          :placeholder="t('complectations.enterName')"
        />
      </n-popconfirm>
    </div>
  </n-card>
  <complectation-modal v-model:show="showModal" />
</template>
