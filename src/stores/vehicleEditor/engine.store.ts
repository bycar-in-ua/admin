import { defineStore } from "pinia";
import { EngineDto as Engine } from "@common/dto";
import vuexStore from "@/store";
import apiClient from "@/helpers/apiClient";
import { useVehicleStore } from "./vehicle.store";

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
      useVehicleStore().car.engines.push(newEngine);
    },
    async updateEngine() {
      const updatedEngine = await apiClient.put(`/engines/${this.engine.id}`, {
        ...this.engine,
        displayName: undefined,
      });

      const vehicleStore = useVehicleStore();

      vehicleStore.car.engines = vehicleStore.car.engines.map((engine) => {
        if (engine.id == updatedEngine.id) {
          return updatedEngine;
        }
        return engine;
      });
    },
    async deleteEngine(engineId: string | number) {
      await apiClient.delete(`/engines/${engineId}`);
      const vehicleStore = useVehicleStore();

      vehicleStore.car.engines = vehicleStore.car.engines.filter(
        (engine) => engine.id !== engineId
      );
    },
  },
});
