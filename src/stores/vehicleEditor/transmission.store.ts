import { defineStore } from "pinia";
import { TransmissionDto as Transmission } from "@bycar-in-ua/common";
import apiClient from "@/helpers/apiClient";
import { useVehicleStore } from "./vehicle.store";

export const useTransmissionStore = defineStore("transmission", {
  state: (): Transmission => ({
    id: undefined,
    drive: "",
    driveName: "",
    gearbox: {
      type: "",
      subType: "",
      numberOfGears: null,
      technology: "",
      manufactureIndex: "",
      made: "",
    },
    brakingSystemTypeFront: "",
    brakingSystemTypeRear: "",
    suspensionTypeFront: "",
    suspensionWorkItemFront: "",
    suspensionTypeRear: "",
    suspensionWorkItemRear: "",
  }),
  actions: {
    async createNewTransmission() {
      const vehicleStore = useVehicleStore();
      const newTransmission = await apiClient.post("/transmissions", {
        ...this.$state,
        vehicleId: vehicleStore.car.id,
      });
      vehicleStore.car.transmissions.push(newTransmission);
    },
    async updateTransmission() {
      const vehicleStore = useVehicleStore();

      const updatedTransmission = await apiClient.put(
        `/transmissions/${this.id}`,
        this.$state
      );

      vehicleStore.car.transmissions = vehicleStore.car.transmissions.map(
        (trans) =>
          trans.id == updatedTransmission.id ? updatedTransmission : trans
      );
    },
    async deleteTransmission(transmissionId) {
      const vehicleStore = useVehicleStore();

      await apiClient.delete(`/transmissions/${transmissionId}`);

      vehicleStore.car.transmissions = vehicleStore.car.transmissions.filter(
        (transmission) => transmission.id !== transmissionId
      );
    },
  },
});
