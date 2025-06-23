import { defineStore } from "pinia";
import { EnginesPrivateService, type Engine } from "@bycar-in-ua/sdk";
import { useVehicleStore } from "./vehicle.store";
import { API_URL } from "@/constants";

const enginesService = EnginesPrivateService.create(API_URL);

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
    } as Engine,
    isFetching: false,
  }),
  actions: {
    async createNewEngine() {
      const vehicleStore = useVehicleStore();

      const newEngine = await enginesService.createEngine({
        ...this.engine,
        vehicleId: vehicleStore.car.id,
      });
      useVehicleStore().car.engines.push(newEngine);
    },
    async updateEngine() {
      const updatedEngine = await enginesService.updateEngine(
        this.engine.id,
        this.engine
      );

      const vehicleStore = useVehicleStore();

      vehicleStore.car.engines = vehicleStore.car.engines.map((engine) => {
        if (engine.id == updatedEngine.id) {
          return updatedEngine;
        }
        return engine;
      });
    },
    async deleteEngine(engineId: string | number) {
      await enginesService.deleteEngine(Number(engineId));
      const vehicleStore = useVehicleStore();

      vehicleStore.car.engines = vehicleStore.car.engines.filter(
        (engine) => engine.id !== engineId
      );
    },
  },
});
