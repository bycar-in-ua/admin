import { defineStore } from "pinia";
import { EngineDto as Engine } from "@common/dto";
import vuexStore from "@/store";
import apiClient from "@/helpers/apiClient";
import { UPDATE_CAR_FIELD } from "../../store/modules/carEditor/mutationTypes";
import { carEditorNamespace } from "../../store/modules/carEditor";

interface State {
  engine: Engine;
  isFetching: boolean;
}

export const useEngineStore = defineStore("engine", {
  state: (): State => ({
    engine: {
      turbo: {},
      hybrid: {},
      electric: {},
    },
    isFetching: false,
  }),
  actions: {
    async createNewEngine() {
      const newEngine = await apiClient.post("/engines", {
        ...this.engine,
        vehicleId: vuexStore.state.carEditor.car.id,
      });
      vuexStore.commit(carEditorNamespace(UPDATE_CAR_FIELD), [
        "engines",
        [...vuexStore.state.carEditor.car.engines, newEngine],
      ]);
    },
    async updateEngine() {
      const updatedEngine = await apiClient.put(`/engines/${this.engine.id}`, {
        ...this.engine,
        displayName: undefined,
      });
      vuexStore.commit(carEditorNamespace(UPDATE_CAR_FIELD), [
        "engines",
        [
          ...vuexStore.state.carEditor.car.engines.map((engine) => {
            if (engine.id == updatedEngine.id) {
              return updatedEngine;
            }
            return engine;
          }),
        ],
      ]);
    },
    async deleteEngine(engineId: string | number) {
      await apiClient.delete(`/engines/${engineId}`);
      vuexStore.commit(carEditorNamespace(UPDATE_CAR_FIELD), [
        "engines",
        vuexStore.state.carEditor.car.engines.filter(
          (engine) => engine.id !== engineId
        ),
      ]);
    },
  },
});
