<template>
  <n-card title="Двигатели" size="small" class="my-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <n-card
        v-for="engine in engines"
        :key="engine.id"
        :title="engine.displayName"
        hoverable
        class="shadow"
      >
        <n-table :bordered="false" :single-line="false" size="small">
          <tbody>
            <tr>
              <td>Мощность, кВт</td>
              <td>{{ engine.power }}</td>
            </tr>
            <tr>
              <td>Крутящий момент, Н/м</td>
              <td>{{ engine.torque }}</td>
            </tr>
          </tbody>
        </n-table>
        <template #action>
          <div class="flex flex-wrap justify-between">
            <a
              href="#"
              class="text-red-500"
              @click.prevent="deleteEngine(engine.id)"
            >
              Удалить
            </a>
            <a
              href="#"
              class="text-primary"
              @click.prevent="openEditModal(engine)"
            >
              Редактировать
            </a>
          </div>
        </template>
      </n-card>
      <plus-button :callback="openCreateModal" />
    </div>
    <engine-modal />
  </n-card>
</template>

<script>
export default {
  name: "Engines",
};
</script>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import EngineModal from "./EngineModal";
import PlusButton from "@/components/VehicleEditor/PlusButton";
import { NCard, NTable } from "naive-ui";
import {
  DELETE_ENGINE,
  OPEN_CREATE_ENGINE_MODAL,
  OPEN_EDIT_ENGINE_MODAL,
} from "@/store/modules/carEditor/engine/actionTypes";
import { carEditorNamespace } from "@/store/modules/carEditor";

const store = useStore();

const engines = computed(() => store.state.carEditor.car.engines);

const openCreateModal = () => {
  store.dispatch(carEditorNamespace(OPEN_CREATE_ENGINE_MODAL));
};

const openEditModal = (engine) => {
  store.dispatch(carEditorNamespace(OPEN_EDIT_ENGINE_MODAL), engine);
};

const deleteEngine = (engineId) => {
  store.dispatch(carEditorNamespace(DELETE_ENGINE), engineId);
};
</script>
