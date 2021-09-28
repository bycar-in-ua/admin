<template>
  <n-card title="Трансимиссии" size="small" class="my-4 shadow">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="transmission in transmissions"
        :key="transmission.id"
        :title="`${transmission.drive} ${transmission.driveName} - ${transmission.gearbox.numberOfGears} ${transmission.gearbox.type}`"
        hoverable
        class="shadow"
      >
        <n-table :bordered="false" :single-line="false" size="small">
          <tbody>
            <tr>
              <td>Привод</td>
              <td>{{ transmission.drive }}, {{ transmission.driveName }}</td>
            </tr>
            <tr>
              <td>КПП</td>
              <td>
                {{ transmission.gearbox.numberOfGears }}
                {{ transmission.gearbox.type }}
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
              Удалить
            </a>
            <a
              href="#"
              class="text-primary"
              @click.prevent="openEditModal(transmission)"
            >
              Редактировать
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
import { NCard, NTable } from "naive-ui";
import PlusButton from "@/components/VehicleEditor/PlusButton";
import TransmissionModal from "./TransmissionModal";
import { carEditorNamespace } from "@/store/modules/carEditor";
import {
  DELETE_TRANSMISSION,
  OPEN_CREATE_TRANSMISSION_MODAL,
  OPEN_EDIT_TRANSMISSION_MODAL,
} from "@/store/modules/carEditor/transmission/actionTypes";

const store = useStore();

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
