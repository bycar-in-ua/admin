<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NCard, NTable, NButton } from "naive-ui";
import { useMutation } from "@tanstack/vue-query";
import PlusButton from "@/components/common/PlusButton.vue";
import AIButton from "@/components/common/AIButton.vue";
import { useEngineStore } from "@/stores/vehicleEditor/engine.store";
import { useVehicleStore } from "@/stores/vehicleEditor/vehicle.store";
import { getEngineLabel } from "@/helpers/engine.helpers";

import EngineModal from "./EngineModal.vue";

defineOptions({
  name: "Engines",
});

const engineStore = useEngineStore();
const vehicleStore = useVehicleStore();
const { t } = useI18n();

const showModal = ref(false);
const isEdit = ref(false);

const openCreateModal = () => {
  isEdit.value = false;
  showModal.value = true;
};

const openEditModal = (engine) => {
  engineStore.engine = engine;
  isEdit.value = true;
  showModal.value = true;
};

const { isPending, mutate: generateEngines } = useMutation({
  mutationKey: ["ai-engines"],
  mutationFn: vehicleStore.generateEngines,
});
</script>

<template>
  <n-card :title="t('vehicle.engine.title', 2)" size="small" class="my-4">
    <template #header-extra>
      <AIButton
        v-if="!vehicleStore.car.engines.length"
        quaternary
        size="small"
        @click="generateEngines"
        :loading="isPending"
      />
    </template>

    <div class="editors-cards-grid">
      <n-card
        v-for="engine in vehicleStore.car.engines"
        :key="engine.id"
        :title="getEngineLabel(engine)"
        hoverable
        size="small"
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
            <n-button
              type="error"
              quaternary
              @click="engineStore.deleteEngine(Number(engine.id))"
            >
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
    <engine-modal v-model:show="showModal" :is-edit="isEdit" />
  </n-card>
</template>
