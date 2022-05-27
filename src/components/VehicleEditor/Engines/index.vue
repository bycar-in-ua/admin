<template>
  <n-card :title="t('vehicle.engine.title', 2)" size="small" class="my-4">
    <div class="editors-cards-grid">
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
              <td>{{ t("vehicle.engine.power") }}</td>
              <td>{{ engine.power }}</td>
            </tr>
            <tr>
              <td>{{ t("vehicle.engine.torque") }}</td>
              <td>{{ engine.torque }}</td>
            </tr>
          </tbody>
        </n-table>
        <template #action>
          <div class="flex flex-wrap justify-between">
            <n-button type="error" quaternary @click="deleteEngine(engine.id)">
              {{ t("delete") }}
            </n-button>

            <n-button quaternary @click="openEditModal(engine)">
              {{ t("edit") }}
            </n-button>
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
import { useI18n } from "vue-i18n";
import EngineModal from "./EngineModal";
import PlusButton from "@/components/common/PlusButton";
import { NCard, NTable, NButton } from "naive-ui";
import {
  DELETE_ENGINE,
  OPEN_CREATE_ENGINE_MODAL,
  OPEN_EDIT_ENGINE_MODAL,
} from "@/store/modules/carEditor/engine/actionTypes";
import { carEditorNamespace } from "@/store/modules/carEditor";

const store = useStore();
const { t } = useI18n();

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
