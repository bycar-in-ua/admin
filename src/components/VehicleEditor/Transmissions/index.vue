<template>
  <n-card
    :title="t('vehicle.transmission.title', 2)"
    size="small"
    class="my-4 shadow"
  >
    <div class="editors-cards-grid">
      <n-card
        v-for="transmission in transmissions"
        :key="transmission.id"
        :title="`${transmission.drive} ${transmission.driveName || ''} - ${
          transmission.gearbox.numberOfGears
        } ${t(
          'vehicle.transmission.gearbox.types.' + transmission.gearbox.type
        )}`"
        hoverable
        class="shadow"
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
            <a
              href="#"
              class="text-red-500"
              @click.prevent="deleteEngine(transmission.id)"
            >
              {{ t("delete") }}
            </a>
            <a
              href="#"
              class="text-primary"
              @click.prevent="openEditModal(transmission)"
            >
              {{ t("edit") }}
            </a>
          </div>
        </template>
      </n-card>
      <plus-button :callback="openCreateModal" />
    </div>
    <transmission-modal />
  </n-card>
</template>

<script>
export default {
  name: "Transmissions",
};
</script>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { NCard, NTable } from "naive-ui";
import PlusButton from "@/components/common/PlusButton";
import TransmissionModal from "./TransmissionModal";
import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  DELETE_TRANSMISSION,
  OPEN_CREATE_TRANSMISSION_MODAL,
  OPEN_EDIT_TRANSMISSION_MODAL,
} from "@/store/modules/carEditor/transmission/actionTypes";

const store = useStore();
const { t } = useI18n();

const transmissions = computed(() => store.state.carEditor.car.transmissions);

const openCreateModal = () => {
  store.dispatch(carEditorNamespace(OPEN_CREATE_TRANSMISSION_MODAL));
};

const openEditModal = (transmission) => {
  store.dispatch(
    carEditorNamespace(OPEN_EDIT_TRANSMISSION_MODAL),
    transmission
  );
};

const deleteEngine = (transmissionId) => {
  store.dispatch(carEditorNamespace(DELETE_TRANSMISSION), transmissionId);
};
</script>
