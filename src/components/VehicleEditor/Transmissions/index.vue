<template>
  <n-card
    :title="t('vehicle.transmission.title', 2)"
    size="small"
    class="my-4 shadow"
  >
    <div class="editors-cards-grid">
      <n-card
        v-for="transmission in vehicleStore.car.transmissions"
        :key="transmission.id"
        :title="getTransmissionDisplayName(transmission, t)"
        hoverable
        class="shadow"
        size="small"
      >
        <n-table :bordered="false" :single-line="false" size="small">
          <tbody>
            <tr>
              <td>{{ t("vehicle.transmission.drive") }}</td>
              <td>{{ transmission.drive }}, {{ transmission.driveName }}</td>
            </tr>
            <tr>
              <td>{{ t("vehicle.transmission.gearbox.abbr") }}</td>
              <td>
                {{ transmission.gearbox.numberOfGears }}
                {{
                  t(
                    "vehicle.transmission.gearbox.types." +
                      transmission.gearbox.type
                  )
                }}
              </td>
            </tr>
          </tbody>
        </n-table>
        <template #action>
          <div class="flex flex-wrap justify-between">
            <n-button
              type="error"
              quaternary
              @click="deleteTransmssion(transmission.id)"
            >
              {{ t("delete") }}
            </n-button>

            <n-button quaternary @click="openEditModal(transmission)">
              {{ t("edit") }}
            </n-button>
          </div>
        </template>
      </n-card>
      <plus-button :callback="openCreateModal" />
    </div>
    <transmission-modal v-model:show="show" :is-edit="isEdit" />
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Transmissions",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NCard, NTable, NButton } from "naive-ui";
import PlusButton from "@/components/common/PlusButton.vue";
import TransmissionModal from "./TransmissionModal.vue";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { useTransmissionStore } from "@/stores/vehicleEditor/transmission.store";
import { getTransmissionDisplayName } from "@/helpers/transmission.helper";

const vehicleStore = useVehicleStore();
const transmissionStore = useTransmissionStore();
const { t } = useI18n();

const show = ref(false);
const isEdit = ref(false);

const openCreateModal = () => {
  isEdit.value = false;
  show.value = true;
};

const openEditModal = (transmission) => {
  isEdit.value = true;
  transmissionStore.$patch(transmission);
  show.value = true;
};

const deleteTransmssion = async (transmissionId) => {
  await transmissionStore.deleteTransmission(transmissionId);
};
</script>
