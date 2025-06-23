import { defineStore } from "pinia";
import type { Transmission } from "@bycar-in-ua/sdk";
import { TransmissionsPrivateService } from "@bycar-in-ua/sdk";
import { useVehicleStore } from "./vehicle.store";
import { API_URL } from "@/constants";

const transmissionsService = TransmissionsPrivateService.create(API_URL);

export const useTransmissionStore = defineStore("transmission", {
  state: (): Transmission =>
    ({
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
    }) as Transmission,
  actions: {
    async createNewTransmission() {
      const vehicleStore = useVehicleStore();
      const newTransmission = await transmissionsService.createTransmission({
        ...this.$state,
        vehicleId: vehicleStore.car.id,
      });
      vehicleStore.car.transmissions.push(newTransmission);
    },
    async updateTransmission() {
      const vehicleStore = useVehicleStore();

      const updatedTransmission = await transmissionsService.updateTransmission(
        this.id,
        this.$state
      );

      vehicleStore.car.transmissions = vehicleStore.car.transmissions.map(
        (trans) =>
          trans.id == updatedTransmission.id ? updatedTransmission : trans
      );
    },
    async deleteTransmission(transmissionId: number) {
      const vehicleStore = useVehicleStore();

      await transmissionsService.deleteTransmission(transmissionId);

      vehicleStore.car.transmissions = vehicleStore.car.transmissions.filter(
        (transmission) => transmission.id !== transmissionId
      );
    },
  },
});
