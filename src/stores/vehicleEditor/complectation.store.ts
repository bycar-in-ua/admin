import { defineStore } from "pinia";
import type { Complectation, PowerUnit } from "@bycar-in-ua/sdk";
import apiClient from "@/helpers/apiClient";
import { useVehicleStore } from "./vehicle.store";

export const useComplectationStore = defineStore("complectation", {
  state: (): Complectation =>
    ({
      id: undefined,
      displayName: "",
      powerUnits: [],
      options: [],
      base: undefined,
    } as Complectation),
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
    createNewPowerUnit() {
      this.powerUnits.push({
        complectationId: this.id,
        consumption: {},
      } as PowerUnit);
    },
    async deletePowerUnit(powerUnit: PowerUnit) {
      await apiClient.delete(`/power-units/${powerUnit.id}`);

      this.powerUnits = this.powerUnits?.filter(
        (unit) => unit.id !== powerUnit.id
      );
    },
  },
});
