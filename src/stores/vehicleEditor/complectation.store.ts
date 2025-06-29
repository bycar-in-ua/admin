import { defineStore } from "pinia";
import { ref } from "vue";
import type { Complectation, PowerUnit } from "@bycar-in-ua/sdk";
import { PowerUnitsPrivateService } from "@bycar-in-ua/sdk";
import {
  type GenerateComplectationPayload,
  n8nService,
} from "@/services/n8n.service";
import { API_URL } from "@/constants";
import { useComplectationsService } from "@/composables/useComplectationsService";
import { useVehicleStore } from "./vehicle.store";
import { useOptionsStore } from "../options.store";

const complectationsService = useComplectationsService();
const powerUnitsService = PowerUnitsPrivateService.create(API_URL);

export const useComplectationStore = defineStore("complectation", () => {
  // State
  const complectation = ref<Partial<Complectation>>({
    id: undefined,
    displayName: "",
    powerUnits: [],
    options: [],
    base: undefined,
  });

  // Actions
  async function saveComplectation() {
    const vehicleStore = useVehicleStore();
    const updatedComplectation =
      await complectationsService.updateComplectation(
        complectation.value.id,
        complectation.value
      );

    if (vehicleStore.car.complectations) {
      vehicleStore.car.complectations = vehicleStore.car.complectations.map(
        (cmpl) =>
          cmpl.id === updatedComplectation.id ? updatedComplectation : cmpl
      );
    }
  }

  function createNewPowerUnit() {
    complectation.value.powerUnits.push({
      complectationId: complectation.value.id,
      consumption: {},
    } as PowerUnit);
  }

  async function deletePowerUnit(powerUnit: PowerUnit) {
    await powerUnitsService.deletePowerUnit(powerUnit.id);
    complectation.value.powerUnits = complectation.value.powerUnits?.filter(
      (unit) => unit.id !== powerUnit.id
    );
  }

  const optionsStore = useOptionsStore();

  async function generateComplectation(
    payload: Omit<GenerateComplectationPayload, "complectationName">
  ) {
    const result = await n8nService.generateComplectation({
      ...payload,
      complectationName: complectation.value.displayName,
    });

    complectation.value.powerUnits = result.powerUnits.map((unit) => {
      const existingPowerUnit = complectation.value.powerUnits.find(
        (pu) =>
          pu.engineId === unit.engineId &&
          pu.transmissionId === unit.transmissionId
      );
      return {
        ...existingPowerUnit,
        ...unit,
        complectationId: complectation.value.id,
      };
    });

    const uniqueOptions = new Set(result.options.map(({ id }) => id));
    const allOptions = optionsStore.options;

    complectation.value.options = [...uniqueOptions].map((id) => {
      return allOptions.find((opt) => opt.id === id);
    });
  }

  return {
    complectation,

    saveComplectation,
    createNewPowerUnit,
    deletePowerUnit,
    generateComplectation,
  };
});
