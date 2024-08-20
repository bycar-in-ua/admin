import { defineStore } from "pinia";
import {
  ComplectationDto as Complectation,
  PowerUnitDto as PowerUnit,
} from "@bycar-in-ua/common";
import apiClient from "@/helpers/apiClient";
import { useVehicleStore } from "./vehicle.store";

export const useComplectationStore = defineStore("complectation", {
  state: (): Complectation => ({
    id: undefined,
    displayName: "",
    powerUnits: [],
    options: [],
    base: undefined,
  }),
  actions: {
    async saveComplectation(options) {
      const vehicleStore = useVehicleStore();
      const updatedComplectation = await apiClient.put(
        `/complectations/${this.id}`,
        {
          ...this.$state,
          options: options,
        }
      );

      vehicleStore.car.complectations = vehicleStore.car.complectations?.map(
        (cmpl) =>
          cmpl.id == updatedComplectation.id ? updatedComplectation : cmpl
      );
    },
    async createNewPowerUnit() {
      const newPowerUnit = await apiClient.post("/power-units", {
        complectationId: this.id,
      });
      this.powerUnits?.push(newPowerUnit);

      return newPowerUnit.id;
    },
    async deletePowerUnit(powerUnit: PowerUnit) {
      await apiClient.delete(`/power-units/${powerUnit.id}`);

      this.powerUnits = this.powerUnits?.filter(
        (unit) => unit.id !== powerUnit.id
      );
    },
  },
});
